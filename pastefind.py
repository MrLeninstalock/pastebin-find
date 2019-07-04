#!/usr/bin/python
import random
import sys
import time
import urllib
import re
import logging

# TODO : Use a config file : https://docs.python.org/2/library/configparser.html
time_between = 50      #Seconds between iterations (not including time used to fetch pages - setting below 5s may cause a pastebin IP block, too high may miss pastes)
cache = []
counter = 0
iterator = 0

# Load the word to find file
wordlist_file = open("toFind.txt", "r")
wordlist = wordlist_file.read().split('\n')
wordlist_file.close()
if '' in wordlist:
    wordlist.remove('')

logging.basicConfig(filename="log",level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')
logging.info("Started")
already_increased = True
while(1):
    iterator += 1
    
    print "Iteration " + str(iterator) + ". In between time : " + str(time_between) 
    if not already_increased:
        time_between = time_between -1
    already_increased = False
    # Open the recently posted pastes page
    time.sleep(random.uniform(2, 7))
    url = urllib.urlopen("http://pastebin.com/archive")
    html = url.read()
    url.close()
    logging.info("Loaded archive page. Iteration %d. Time beetween : %d" % (iterator, time_between))

    # We can get blocked if doing too much request
    while "(once your IP block has been lifted)" in html:
        logging.error("Blocked. Iterator : %d, Counter : %d" % (iterator, counter) )
        print("Blocked")
        # Wait 15mn
        time.sleep(900)    
    
    else:   
        # Capture all pastebin id's
        id_list = re.findall('href="\/([a-zA-Z1-9]{8})"', html)
        
        # Remove junk that match regex
        if "messages" in id_list:
            id_list.remove("messages")
        if "settings" in id_list:
            id_list.remove("settings")

        for id in id_list:
            if id not in cache:
                counter += 1
                cache.append(id)

                #Begin loading of raw paste text
                time.sleep(random.uniform(0.5, 3))
                url_2 = urllib.urlopen("https://pastebin.com/raw/" + id)
                raw_text = url_2.read()
                url_2.close()
        
                for word in wordlist:
                    matchs = re.findall(word, raw_text, re.IGNORECASE)
                    # TODO Write an extract of what has been found
                    for word in matchs:
                        print "FOUND " + word + " in http://pastebin.com/raw.php?i=" + id
                        f = open("./Found/"+ word +".txt", "a")
                        f.write(id + "\n")
                        f.close()
                        logging.info("Found %s", word)
            else:
                    if not already_increased:
                        print("Increasing time between")
                        already_increased = True
                        time_between = time_between + 1 
        time.sleep(time_between)
