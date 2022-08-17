const Discord = require("discord.js");

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

client.login("OTU4NDQxNjkzNDQ1NzgzNjM0.YkNYYg.eMXplkm4Q_rthwafwWSjpPlnbyg");

client.on("ready", on_ready);

function on_ready() {
  let bot = client.user;
  bot.setActivity(" Bloons TD Battles 2");
}

client.on("messageCreate", on_message);

const upgrades = require("./upgrades.json");

const names = [
  ["dart monkey", "dart"],
  ["boomerang", "boomerang monkey", "boomer"],
  ["bomb shooter", "bomb", "bomb tower", "bomber"],
  ["tack shooter", "tack"],
  ["ice", "ice monkey", "ice tower"],
  ["glue gunner", "glue"],
  ["sniper monkey", "sniper"],
  ["monkey sub", "sub", "submarine", "monkey submarine"],
  ["buccaneer", "monkey buccaneer", "bucc", "pirate"],
  ["ace", "monkey ace"],
  ["heli pilot", "heli", "helicopter"],
  ["mortar", "mortar monkey", "mortar tower"],
  ["dartling", "dartling gunner", "dartling monkey"],
  ["wiz", "wizard monkey", "wizard"],
  ["super", "super monkey"],
  ["ninja", "ninj", "ninja monkey"],
  ["alchemist", "alc", "alch"],
  ["druid"],
  ["banana farm", "farm"],
  ["spike factory", "spike", "spact"],
  ["monkey village", "village"],
  ["engineer monkey", "engineer", "engi"],
];

function on_message(message) {
  if (message.author.bot === false) {
    let msg = message.content.toLowerCase();
    let reply = "empty";
    if (msg === "quincy") {
      reply = "I never miss!";
    } else if (msg === "gwen") {
      reply = "We have ignition!";
    } else if (msg === "obyn") {
      reply = "Feel nature's wrath!";
    } else if (msg === "striker") {
      reply = "Prepare for liberation!";
    } else if (msg === "help") {
      reply =
        "Type a tower name, followed by the singular path you would like to see the description of. For example: 'sniper x3x'";
    } else {
      let tower = msg.substring(0, msg.search(/[x12345]/) - 1).toLowerCase();
      let fullPath = msg.substring(msg.search(/[x12345]/));
      let path = fullPath.search(/[^x]/);
      let upgrade = fullPath.charAt(path) - 1; //-1 to convert from number to index

      let towerIndex = -1;
      for (let i = 0; i < names.length; i++) {
        if (names[i].includes(tower)) {
          towerIndex = i;
        }
      }
      if (towerIndex === -1) {
        reply = "This tower does not exist.";
      } else {
        upgrade = upgrades[towerIndex * 15 + path * 5 + upgrade];
        reply =
          upgrade.title +
          "\nCost: " +
          upgrade.cost +
          "\nDescription: " +
          upgrade.description +
          "\nEffect: " +
          upgrade.effect;
      }
    }
    if (reply != "empty") {
      message.reply(reply);
    }
  }
}
