/*
Example command: 8ball

This command chooses a response from the array 'responses', and returns it
*/
const responses = ["Yes", "I'm not sure", "Ask again later", "No", "Definitely not", "Definitely", "Maybe"];

exports.run = (client, message, args) => {
var response = responses[Math.floor(Math.random()*responses.length)];
message.channel.send(response).then().catch(console.error);
}

/*
This is the command config

When DM is true, the command is disabled, this can be changed and then put into action by reloading the module

When owneronly is true, only the person with ownership, declared in config.json, can use the command
*/
exports.conf = {
    DM: true,
    OwnerOnly: false
}