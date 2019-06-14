#!/usr/bin/python
# Python file to monitor pastebin for pastes containing the passed regex

import sys
import time
import urllib
import re

# User-defined variables
# TODO : Use a config file : https://docs.python.org/2/library/configparser.html
time_between =  20      #Seconds between iterations (not including time used to fetch pages - setting below 5s may cause a pastebin IP block, too high may miss pastes)
error_on_cl_args = "Please provide a single regex search via the command line"   #Error to display if improper command line arguments are provided

iterater = 1

wordlist_file = open("toFind.txt", "r")
wordlist = wordlist_file.read().split('\n')
wordlist_file.close()

while(1):
    counter = 0

    print "Scanning pastebin - iteration " + str(iterater) + "..."
    
    # Open the recently posted pastes page
    #url = urllib.urlopen("http://pastebin.com/archive")
    #html = url.read()
    #url.close()

    # Capture all pastebin id's
    #id_list = re.findall('href="\/([a-zA-Z1-9]{8})"', html)
    id_list = ["1","2","3","4","5","6"]
    if "messages" in id_list:
        id_list.remove("messages")
    if "settings" in id_list:
        id_list.remove("settings")

    for id in id_list:
        #Begin loading of raw paste text
        #url_2 = urllib.urlopen("https://pastebin.com/raw/" + id)
        #raw_text = url_2.read()
        #url_2.close()
        raw_text = open("tmmp", "r").read()
        
        # TODO : Use a file of keyword to find
        for word in wordlist:
            if re.search(word, raw_text):
                print "FOUND " + word + " in http://pastebin.com/raw.php?i=" + id
                f = open("./Found/"+word+".txt", "a")
                f.write(id + "\n")
                f.close()
        counter += 1
    iterater += 1
    time.sleep(time_between)
