const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", function(){
	console.log("ubi online")
});

client.on("message", async function(message){
	if (message.author.id != client.user.id){
		if (message.content == "hello ubi"){
			message.channel.send("Hello there.")
		}else if (message.content == "bye ubi"){
			message.channel.send("why u leavin?")
		}
	}
})

client.login(process.env.BOT_TOKEN);
