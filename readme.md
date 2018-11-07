 ## Kit Bot
Modular bot template

 ## Running
Some node modules are required, primarily sqlite and Discord.js, these should be installed upon running `npm install`<br/>
To set up system variables, replace the objects in `config.example.json`, rename it `config.json`, and then remove the comments and run `node app.js`<br/>
If there are any major errors when this is run, feel free to report them in the issues section<br/>
<br/>
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