/*

Original Framework Written by: Max W. (Kaboodle3005)
Node modules belong to their respective owners

MIT License

Copyright (c) 2018 Max W.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge copies of the Software, not including distributing
and selling copies of this Software and to permit persons to whom the Software 
is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");

const config = require("./config.json");

//SQLite database file - This stores prefixes
const sql = require("sqlite");
sql.open("./db.sqlite");
//The app may need to be started twice before this works

//Event loader (for events that aren't in this file)
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    let eventFunction = require(`./events/${file}`);
    let eventName = file.split(".")[0];

    client.on(eventName, (...args) => eventFunction.run(client, ...args));
  });
});

//On-message event
client.on("message", async message => {

  if(message.channel.type === "dm") return; //This way it ignores DM mesages

  //This will grab the prefix for the given guild
  sql.get(`SELECT * FROM prefixes WHERE serverId ="${message.guild.id}"`).then(row => {

    //If there isn't one saved, this will set one
    if(!row){
      var customPrefix = "!";
      sql.run("CREATE TABLE IF NOT EXISTS prefixes (prefix TEXT, serverId TEXT)").then(() => {
        sql.run("INSERT INTO prefixes (prefix, serverId) VALUES (?, ?)", [config.prefix, message.guild.id]);
      });  
    } else {
      var customPrefix = row.prefix;
    }

  
    if (message.author.bot) return; //Ignore bots
  
    if(message.guild){

      //Add the server to the prefix database table
    sql.get(`SELECT * FROM prefixes WHERE serverId ="${message.guild.id}"`).then(row => {
      if(!row){
        sql.run("INSERT INTO prefixes (prefix, serverId) VALUES (?, ?)", [config.prefix, message.guild.id]);
        console.log("added to prefixes");
      }
		  }).catch(() => {
        sql.run("CREATE TABLE IF NOT EXISTS prefixes (prefix TEXT, serverId TEXT)").then(() => {
          sql.run("INSERT INTO prefixes (prefix, serverId) VALUES (?, ?)", [config.prefix, message.guild.id]);
        });
		  });
  }
  
    var botMention = "<@" + client.user.id + ">";
    var botMentionX = "<@!" + client.user.id + ">";
  
    //Command handler, this part checks the message to see if the prefix is present
    if(message.guild){
    if((message.content.indexOf(config.prefix) !== 0) && 
       (message.content.indexOf(customPrefix) !== 0) &&
        (message.content.indexOf(botMention) !== 0) &&
          (message.content.indexOf(botMentionX)))  return;
    }
    
    var args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    var command = args.shift().toLowerCase();
    
    if(message.content.startsWith(customPrefix)){
    args = message.content.slice(customPrefix.length).trim().split(/ +/g);
    command = args.shift().toLowerCase();
    }
  
    if(message.content.startsWith(botMention)){
      args = message.content.slice(botMention.length).trim().split(/ +/g);
      command = args.shift().toLowerCase();
      }
  
      if(message.content.startsWith(botMentionX)){
        args = message.content.slice(botMentionX.length).trim().split(/ +/g);
        command = args.shift().toLowerCase();
        }
  
        //Command alias checker - messy but working
        delete require.cache[require.resolve(`./JSON/aliases.json`)];
        var aliasAR = require("./JSON/aliases.json");
        for (const key of Object.keys(aliasAR)) if (aliasAR[key].aliases.includes(command)) command = key;

      //Debug logger
    console.log(message.author.username + 
       ">>\n" + message.guild.name + 
       ">>\n" + "CMD>> '" + command + "'\n" + 
                "ARG>> " + args.join(", ") + "\n");
    console.log('\x1b[32m', "=======");
               
  
    try {
      let commandFile = require(`./commands/${command}.js`);
      if(commandFile.conf.DM === true){
      commandFile.run(client, message, args);
      } else {
        const embed = new Discord.RichEmbed()
      .setColor(0xF46242)
      .setTitle("This command is disabled")
      message.channel.send({embed});
      }
    } catch (err) {
      console.error("Invalid command: " + err);
      //message.channel.send("err: " + err)
    }
  
  
  
});
});

client.login(config.token);