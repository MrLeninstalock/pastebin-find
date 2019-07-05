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

# Tor configuration
# tor = TorRequest(password='TE4U1FTh13tHL4m8WgfbC8m549cRmh')

bad_proxy = []
error_message= [
    "500 Internal",
    "If you are at an office or shared network, you can ask"
]

def scrap_proxy():
    url = "https://free-proxy-list.net/"
    regex = "(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})<\/td><td>(\d{3,5})"
    proxy_list = []

    response = requests.get(url).text
    p_list = re.findall(regex, response)
    
    for tup in p_list:
        proxy_list.append(':'.join(tup))

    return proxy_list

# TODO thread this shit so that I always have a fresh list of functionnal proxy
def get_proxy():
    proxy_pool = scrap_proxy()
    for proxy in proxy_pool:
        bad = False
        if proxy not in bad_proxy:
            try:
                response = requests.get("http://pastebin.com/archive",proxies={"http": proxy, "https": proxy}, timeout=5)
                for msg in error_message:
                    print msg
                    if msg in response.text:
                        bad_proxy.append(proxy)
                        bad = True
                        break
                if not bad:
                    #print response.text
                    return proxy
            except:
                print("Skipping")
                bad_proxy.append(proxy)
        else:
            pass
            #print("Known bad")

# TODO : Use a config file : https://docs.python.org/2/library/configparser.html
time_between = 50      #Seconds between iterations (not including time used to fetch pages - setting below 5s may cause a pastebin IP block, too high may miss pastes)
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
logging.basicConfig(filename="log",level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')
logging.info("Started")

# Getting the first proxy
proxy = get_proxy()

while(1):
    # If we are blocked, we have to renew the proxy
    if blocked:
        proxy=get_proxy()

    logging.info("Using proxy : " + proxy)
    print "Iteration %d. Waiting time : %d. Using proxy %s" % (iterator, time_between, proxy)

    iterator += 1
    
    if increase:
        logging.info("Increasing between_time.")
        #time_between = time_between + 1
    else:
        logging.info("Decreasing between time.")
        #time_between = time_between - 1
    
    # Open the recently posted pastes page
    time.sleep(random.uniform(1, 2))
    try:
        response = requests.get("http://pastebin.com/archive", proxies={"http": proxy, "https": proxy}, timeout=5)
        html = response.text    
    except Exception as e:
        logging.info("Proxy error when loading archive page: " + str(e.message))
        print("Proxy error when loading archive page : " + str(e.message))
        blocked=True
    if not blocked:
        
        logging.info("Loaded archive page. Iteration %d. Time beetween : %d" % (iterator, time_between))

        # We can get blocked if doing too much request
        if "(once your IP block has been lifted)" in html:
            logging.error("Blocked. Iterator : %d, Counter : %d" % (iterator, counter))
            print("Blocked. Iterator : %d, Counter : %d" % (iterator, counter))
            blocked = True
            break
        else:   
            # Capture all pastebin id's
            id_list = re.findall('href="\/([a-zA-Z1-9]{8})"', html)
            print id_list

            # Remove junk that match regex
            if "messages" in id_list:
                id_list.remove("messages")
            if "settings" in id_list:
                id_list.remove("settings")

            increase = False
            already_done = 0
            total = 0
            raw_text = ""

            for id in id_list:
                if id not in cache:
                    counter += 1
                    total += 1
                    cache.append(id)

                    #Begin loading of raw paste text
                    time.sleep(random.uniform(0.5, 2))
                    try:
                        response = requests.get("https://pastebin.com/raw/" + id, proxies={"http": proxy, "https": proxy})
                        raw_text = response.text
                        #print "------------------------------"
                        #print raw_text
                        #print "------------------------------"
                    except Exception as e:
                        blocked = True
                        logging.info("Proxy error : " +str(e.message))
                        print("Proxy error : " + str(e.message))
                        break
            
                    for word in wordlist:
                        matchs = re.findall(word, raw_text, re.IGNORECASE)
                        # TODO Write an extract of what has been found
                        duplicata = []
                        for word in matchs:
                            if word not in duplicata:
                                duplicata.append(word)
                                print "FOUND " + word + " in http://pastebin.com/raw.php?i=" + id
                                f = open("./Found/"+ word +".txt", "a")
                                f.write(id + "\n")
                                f.close()
                                logging.info("Found %s", word)
                else:
                    already_done += 1
                    increase = True
            if total > 0:
                percentage = (already_done/total) * 100
            else:
                percentage = 0
            logging.info("Processed %d pastebin. %d were already done (%f percent)" % (total, already_done, percentage))
            print("Processed %d pastebin. %d were already done (%f percent)" % (total, already_done, percentage))
            time.sleep(time_between)

