#!/usr/bin/python
from __future__ import division
import random
import sys
import time
import urllib
import re
import logging
#from torrest import TorRequest
import requests
import datetime

# Tor configuration
# tor = TorRequest(password='TE4U1FTh13tHL4m8WgfbC8m549cRmh')
end_color = "\033[0m"
bad_proxy = []
error_message= [
    "500 Internal",
    "If you are at an office or shared network, you can ask"
]
# Dict from where to scrap proxy
proxy_to_scrap = {
    "http://www.idcloak.com/proxylist/elite-proxy-list.html":'<td>(\d{2,5})<\/td><td>(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})',
    "https://free-proxy-list.net/":"(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})<\/td><td>(\d{3,5})"
}

def replaceLine(new):
    sys.stdout.write("\033[F") #back to previous line
    sys.stdout.write("\033[K") #clear line
    print(new)
'''
Go through a few websites and scrap free proxy from them.
Try to only scrap elite free proxy
'''
def scrap_proxy():
    #print("Scraping proxy")
    for key in proxy_to_scrap: 
        url = key
        regex = proxy_to_scrap[key]

        proxy_list = []

        response = requests.get(url).text
        p_list = re.findall(regex, response)
        
        for tup in p_list:
            if '.' in str(tup[0]):
               proxy = ':'.join(tup)
            else:
                proxy = ':'.join(tup[::-1])

            if proxy not in bad_proxy:
                proxy_list.append(proxy)
        if len(proxy_list) == 0:
            print("Proxy list empty. Change proxy site !")
        else:
            return proxy_list
    print("Wown nothing found !")

# TODO thread this shit so that I always have a fresh list of functionnal proxy
def get_proxy():
    print("Looking for proxy ...")
    while 1:
        proxy_pool = scrap_proxy()
        for proxy in proxy_pool:
            bad = False
            if proxy not in bad_proxy:
                try:
                    print proxy
                    response = requests.get("http://pastebin.com/archive",proxies={"http": proxy, "https": proxy}, timeout=5)
                    for msg in error_message:
                        if msg in response.text:
                            print("Error")
                            bad_proxy.append(proxy)
                            bad = True
                            break
                        if not bad:
                            #print "Good proxy found : %s" % proxy
                            #logging.info("Good proxy found : %s" % proxy)
                            print response.message
                            return proxy

                except Exception as e:
                    print("Skipping")
                    print e.message
                    bad_proxy.append(proxy)
            else:
                pass
                #print("Known bad")
    
# TODO : Use a config file : https://docs.python.org/2/library/configparser.html
time_between = 50      #Seconds between iterations (not including tetime used to fetch pages - setting below 5s may cause a pastebin IP block, too high may miss pastes)
cache = []
counter = 0
iterator = 0
increase = False
blocked = False
html = ""

# Load the word to find file
wordlist_file = open("toFind.txt", "r")
wordlist = wordlist_file.read().split('\n')
wordlist_file.close()
if '' in wordlist:
    wordlist.remove('')

# Setting up logger
logging.basicConfig(filename="log",level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logging.info("Started")

# Getting the first proxy
proxy = get_proxy()
logging.info("Using proxy : %s" % proxy)
while(1):
    html = "NONE"
    # If we are blocked, we have to renew the proxy
    if blocked:
        proxy=get_proxy()
        logging.info("Using proxy : %s" % proxy)
        print("Using proxy : %s" % proxy)
        blocked = False

    iterator += 1
    
    if increase:
        pass
        #logging.info("Increasing between_time.")
        #time_between = time_between + 1
    else:
        pass
        #logging.info("Decreasing between time.")
        #time_between = time_between - 1
    
    # Open the recently posted pastes page
    time.sleep(random.uniform(1, 2))
    try:
        response = requests.get("http://pastebin.com/archive", proxies={"http": proxy, "https": proxy}, timeout=5)
        html = response.text 
    except Exception as e:
        logging.error("Proxy error when loading archive page: " + str(e.message))
        #print("Proxy error when loading archive page : " + str(e.message))
        print("Blocked loading archive page")
        bad_proxy.append(proxy)
        blocked=True
    if not blocked:
        
        logging.info("Loaded archive page. Iteration %d. Time beetween : %d" % (iterator, time_between))

        # We can get blocked if doing too much request
        if "(once your IP block has been lifted)" not in html:
            # Capture all pastebin id's
            id_list = re.findall('href="\/([a-zA-Z1-9]{8})"', html)
            if len(id_list) > 0:
                # Remove junk that match regex
                if "messages" in id_list:
                    id_list.remove("messages")
                if "settings" in id_list:
                    id_list.remove("settings")

                increase = False
                already_done = 0
                processed = 0
                total = len(id_list)
                raw_text = ""
                print("Processing found pastebin...")
                for id in id_list:
                    replaceLine("Processing pastebin %d/%d" % (id_list.index(id), total))
                    if id not in cache:
                        counter += 1
                        cache.append(id)

                        #Begin loading of raw paste text
                        time.sleep(random.uniform(0.1, 1))
                        try:
                            response = requests.get("https://pastebin.com/raw/" + id, proxies={"http": proxy, "https": proxy}, timeout=5)
                            raw_text = response.text
                            processed += 1
                        except Exception as e:
                            blocked = True
                            logging.error("Proxy error : " +str(e.message))
                            bad_proxy.append(proxy)
                            #print("Proxy error : " + str(e.message))
                            break
                        for word in wordlist:
                            matchs = re.findall(word, raw_text, re.IGNORECASE)
                            # TODO Write an extract of what has been found
                            duplicata = []
                            for word in matchs:
                                if word not in duplicata:
                                    duplicata.append(word)
                                    print("\033[92m FOUND " + word + " in http://pastebin.com/raw.php?i=" + id + end_color)
                                    f = open("./Found/"+ word +".txt", "a")
                                    f.write(id + "\n")
                                    f.close()
                                    logging.info("Found %s", word)
                    else:
                        already_done += 1
                        processed += 1
                        increase = True
                already_percentage = (already_done/total) * 100
                processed_percentage = (processed/total) * 100
                logging.info("Processed %f of pastebin. %f were already done" % (processed_percentage, already_percentage))
                print("Processed %f of pastebin. %f were already done" % (processed_percentage, already_percentage))
                if not blocked:
                    time.sleep(time_between)
            else:
                # Error when loading archive page
                print("Error loading id list")
                bad_proxy.append(proxy)
                blocked = True
            
        else:
            # Got ban
            logging.error("Blocked. Iterator : %d, Counter : %d" % (iterator, counter))
            print("Blocked. Iterator : %d, Counter : %d" % (iterator, counter))
            bad_proxy.append(proxy)
            blocked = True
            
