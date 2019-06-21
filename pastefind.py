#!/usr/bin/python
import random
import sys
import time
import urllib
import re
import logging

# TODO : Use a config file : https://docs.python.org/2/library/configparser.html
time_between =  20      #Seconds between iterations (not including time used to fetch pages - setting below 5s may cause a pastebin IP block, too high may miss pastes)
cache = []
counter = 0
iterator = 0

# Load the word to find file
wordlist_file = open("toFind.txt", "r")
wordlist = wordlist_file.read().split('\n')
wordlist_file.close()

logging.basicConfig(filename="log",level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')
logging.info("Started")

while(1):
    iterator += 1

    print "Iteration " + str(iterator) + "..."
    
    # Open the recently posted pastes page
    time.sleep(random.uniform(0.5, 1.6))
    url = urllib.urlopen("http://pastebin.com/archive")
    html = url.read()
    url.close()
    logging.info("Loaded archive page. Iteration %d" % iterator)

    # We can get blocked if doing too much request
    while "(once your IP block has been lifted)" in html:
        logging.error("Blocked. Iterator : %d, Counter : %d" % (iterator, counter) )
        print("Blocked")
        # Wait 5mn
        time.sleep(300)    
    
    else:   
        # Capture all pastebin id's
        id_list = re.findall('href="\/([a-zA-Z1-9]{8})"', html)
        
        # Remove junk that match regex
        if "messages" in id_list:
            id_list.remove("messages")
        if "settings" in id_list:
            id_list.remove("settings")

        for id in id_list:
            print("Actual id : " + id)
            if id not in cache:
                counter += 1
                cache.append(id)

                #Begin loading of raw paste text
                url_2 = urllib.urlopen("https://pastebin.com/raw/" + id)
                raw_text = url_2.read()
                url_2.close()
        
                for word in wordlist:
                    if re.search(word, raw_text, re.IGNORECASE):
                        # TODO Write an extract of what has been found
                        print "FOUND " + word + " in http://pastebin.com/raw.php?i=" + id
                        f = open("./Found/"+word+".txt", "a")
                        f.write(id + "\n")
                        f.close()
                        logging.info("Found %s", word)
            else:
                print("Not processed id : " + id)  
        time.sleep(time_between)
