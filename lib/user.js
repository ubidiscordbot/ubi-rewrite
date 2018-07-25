/*
=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+
Start of prefixes, only alter config
=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+
*/

const fs = require("fs")

const config = {

	name: "user", //name of module (no .js)

	version:"1.0.2", //version

	commands: ["avatar", "id", "help"], //commands without prefix

	description: "The user command is to get user data from your discord account" //description (this shows up in help)
}

function setup(){

	var data = JSON.parse(fs.readFileSync('lib/modules.json', 'utf8'));

	if (data[config.name] == undefined || data[config.name]["version"] != config.version){

		data[config.name] = config;

		fs.writeFile("lib/modules.json", JSON.stringify(data), (error) => {});
	
	}
}

setup(config)

module.exports = {
		main: main_
}



/*
=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+
End of prefixes ------------------------
=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+
*/




function main_(content, command, messageObj){

	//Your code. Use if or switch statements to alter between the different command types you listed in config.commands.
	if (command === 'avatar') {
    	messageObj.reply(messageObj.author.avatarURL);
	}
	if (command === 'id') {
    	messageObj.reply("**[**" + messageObj.author.id + "**]**");
	}
}



//Export functions
