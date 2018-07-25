/*
=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+
Start of prefixes, only alter config
=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+
*/

const fs = require("fs")
const botConfig = JSON.parse(fs.readFileSync('config.json', 'utf8'));
const prefix = botConfig["prefix"]

const config = {

	name: "name", //name of module (no .js)

	version:"1.0.0", //version

	commands: ["command"], //commands without prefix

	description: "This is a description", //description (this shows up in help)

	prefix: prefix
}

function setup(){

	var data = JSON.parse(fs.readFileSync('lib/modules.json', 'utf8'));

	if (data[config.name] == undefined || data[config.name]["version"] != config.version || data[config.name]["prefix"] != config.prefix){

		data[config.name] = config;

		fs.writeFile("lib/modules.json", JSON.stringify(data), (error) => {});

		console.log("Done setting up")
	
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
	if(command == ""){

	}else if(command == "help"){
			let help = ``
			let name = config["name"].charAt(0).toUpperCase() + config["name"].substr(1,config["name"].length).toLowerCase();
			messageObj.channel.send({embed: {color: parseInt(botConfig.botColor), title: name, description: help}})
	}
}



//Export functions
