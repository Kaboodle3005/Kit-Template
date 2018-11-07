 ## Kit Bot
Modular bot template based off of Kit (https://github.com/Kaboodle3005/Kit)<br/>
Mostly it's just a dumbed down broken down version of Kit, for anyone wanting to make their own bot

 ## Running
Some node modules are required, primarily sqlite and Discord.js, these should be installed upon running `npm install`<br/>
To set up system variables, replace the objects in `config.example.json`, rename it `config.json`, and then remove the comments and run `node app.js`<br/>
If there are any major errors when this is run, feel free to report them in the issues section

 ## Config
This is what your config file should look like when finished
```json
{
    "token": "NDM1O-PASTE-MzYwNzc5.TOKEN.Z-xwL1ESzTD-HERE-gIVhiz5A",
    "prefix": "?",
    "owner": "378769654942007299"
}
```
<br/>`owner` should be replaced with your ID, `token` should be replaced with the bot account's token

 ## Command Format

 ```js
const Discord = require('discord.js'); //This line is optional, use it if you want to use rich embeds

exports.run = (client, message, args) => {

//Code to be run here

}

exports.conf = {
    DM: true, //Changing this to false disables the command
    OwnerOnly: false //Changing this to true makes the command only work for the owner
}
 ```

 ## Command Aliases
Some commands have aliases, they are included in `./JSON/aliases.json`.<br/>
When an alias is used, it calls the parent command instead<br/>
<br/>
**Aliases have to be added in this format:**
```js
{
    "command-name":{
        "aliases":["alias"]
    },
    "command-name":{
        "aliases":["alias"]
    }
}
```