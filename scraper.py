import csv
from pathlib import Path
from bs4 import BeautifulSoup
import requests

tower_names = [str("_".join(word)+"_") for word in [name.split(" ") for name in "Dart Monkey · Boomerang Monkey · Bomb Shooter · Tack Shooter · Ice Monkey · Glue Gunner · Sniper Monkey · Monkey Sub · Monkey Buccaneer · Monkey Ace · Heli Pilot · Mortar Monkey · Dartling Gunner · Wizard Monkey · Super Monkey · Ninja Monkey · Alchemist · Druid · Banana Farm · Spike Factory · Monkey Village · Engineer Monkey".split(
    " · ")]]


urls = ["https://bloons.fandom.com/wiki/"+tower +
        "(BTDB2)" for tower in tower_names]

num = 0
for url in urls:
    r = requests.get(url)
    soup = BeautifulSoup(r.content, 'html5lib')
    title_tags = soup.find_all(attrs={"class": "bloons-upgradebox-title"})
    upgrade_titles = [tag.contents[0].get_text() for tag in title_tags][0:15]
    upgrade_costs = [tag.contents[2].get_text()[6:]
                     for tag in title_tags][0:15]

    body_tags = soup.find_all(attrs={"class": "bloons-upgradebox-body"})
    upgrade_descriptions = [tag[11:] if tag[0:9] == "From BTD6" else tag[6:] if tag[0:4] == "BTD6" else tag for tag in [
        tag.contents[1].get_text()[1:-1] for tag in body_tags][0:15]]

    # print(body_tags[4].contents[4].get_text()[1:-1])
    upgrade_effects = [tag[12:] if (len(tag) > 0 and tag[0] == "(") else "Self-explanatory" if len(tag) == 0 else tag[11:] if tag[0:9] == "From BTD6" else tag[6:] if tag[0:4] == "BTD6" else tag for tag in [tag.contents[4].get_text()[1:-1]
                       for tag in body_tags][0:15]]
    upgrade_effects = []
    for tag in body_tags[0:15]:
        upgrade = ""
        for i in range(4, len(tag.contents)):
            upgrade += tag.contents[i].get_text()
        upgrade = upgrade[1:-1]
        if (len(upgrade) > 0 and upgrade[0] == "("):
            upgrade = upgrade[12:]
        elif len(upgrade) == 0:
            upgrade = "Self-explanatory"
        elif upgrade[0:9] == "From BTD6":
            upgrade = upgrade[11:]
        elif upgrade[0:4] == "BTD6":
            upgrade = upgrade[6:]

        upgrade_effects.append(upgrade)

    with open("upgrades.csv", "a", newline='') as csv_file:
        writer = csv.writer(csv_file)
        for row in zip(upgrade_titles, upgrade_costs, upgrade_descriptions, upgrade_effects):
            writer.writerow(row)
            print(row)
