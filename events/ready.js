/*
This code is run when the client emits "Ready", when it's connected to Discord
*/
exports.run = (client) => {
    console.log("Client Logon Successful");
	console.log('\x1b[32m', "======================");
	console.log('\x1b[33m', `${client.users.size} users - ${client.channels.size} channels - ${client.guilds.size} guilds.`);
	console.log('\x1b[32m', "=========log==========");

	client.user.setActivity('cute stuff', { type: 2});
    client.user.setStatus('online');
  }