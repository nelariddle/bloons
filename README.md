# bloons

## Purpose
This was my final project for CSCI-A 290, Introduction to JavaScript. We were tasked with writing a Discord bot which would respond to multiple commands. I chose to write a bot that could instantly provide any upgrade for a BTD6 tower and its cost and description. Given that there are 22 towers with 15 upgrades each, this was a hefty task. While many players of the game have a good grasp of most of the game's upgrades, seeing the exact numerics of each upgrade can be quite helpful. These usually have to be searched up on the game's wiki, so I wanted to make a centralized database to simplify the process. 

While the assignment only required the bot to respond to two different "patterns" typed into Discord, I chose to include all 330 upgrades from the game, which would equate to 330 different commands. Therefore, I felt a web scraper would be helpful in retrieving the upgrades from the wiki and storing them in a csv. After my initial attempt, I scanned through the generated csv and found several incomplete descriptions. I eventually realized that formatting, such as a italics, and hyperlinks within the text were interrupting some tags, so I had to alter my approach to capture the entire text. Once the scraping was complete, I used an online resource to convert the csv to a usable json file. 

Finally, I wrote the actual bot that responded to the commands. It recognized any comment which started with the tower name followed by the upgrade path, represented as xxx with one of the x's replaced by the upgrade tier (https://bloons.fandom.com/wiki/Crosspathing). I used a list of lists that contained all the different ways by which a tower could be referred in order to make the bot more flexible (such as sub vs. submarine). In the end, the bot successfully worked in responding to all the upgrade paths. Although I no longer play the game, I think the bot could be very beneficial for players who need to see upgrades and their descriptions quickly.

![The bot supplies an upgrade description.](bot-ss.jpg "Bot functionality")

## Contents
- bloonsBot.js: the Discord bot's source code
- scraper.py: the python file that retrieved the upgrades from the internet
- upgrades.csv: the upgrades, initially in csv format
- upgrades.json: the upgrades, in usable json format
