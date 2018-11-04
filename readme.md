 ## Kit Bot
Modular bot template

 ## Running
Some node modules are required, primarily sqlite and Discord.js, these should be installed upon running `npm install`<br/>
To set up system variables, replace the objects in `config.example.json`, rename it `config.json`, and then remove the comments and run `node app.js`<br/>
If there are any major errors when this is run, feel free to report them in the issues section<br/>
<br/>
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