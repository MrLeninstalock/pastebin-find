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

# Check for command line argument (a single regex)
if len(sys.argv) != 1:
    search_term = sys.argv[1]
else:
    print error_on_cl_args
    exit()

iterater = 1

wordlist_file = open("toFind.txt", "r")
wordlist = wordlist_file.read().split('\n')
wordlist_file.close()

while(1):
    counter = 0

    print "Scanning pastebin - iteration " + str(iterater) + "..."
    
    # Open the recently posted pastes page
    url = urllib.urlopen("http://pastebin.com/archive")
    html = url.read()
    url.close()

    # Capture all pastebin id's
    id_list = re.findall('href="\/([a-zA-Z1-9]{8})"', html)
    if "messages" in id_list:
        id_list.remove("messages")
    if "settings" in id_list:
        id_list.remove("settings")

    for id in id_list:
        #Begin loading of raw paste text
        url_2 = urllib.urlopen("https://pastebin.com/raw/" + id)
        raw_text = url_2.read()
        url_2.close()
        
        # TODO : Use a file of keyword to find
        for word in wordlist:
            if re.search(word, raw_text):
                print "FOUND " + word + " in http://pastebin.com/raw.php?i=" + id
        
        counter += 1
    iterater += 1
    time.sleep(time_between)
