const config = require("./../config.json");

exports.run = (client, message, args) => {
  if(!message.author.id === config.owner){
    return;
  } else {

    if(!args || args.size < 1) return;
    delete require.cache[require.resolve(`./${args[0]}.js`)];

           message.channel.send(`The module \`${args[0]}\` has been reloaded`);

  }
  }
  
  exports.conf = {
    DM: true,
    OwnerOnly: false
}
