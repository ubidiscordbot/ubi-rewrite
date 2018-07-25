/*
=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+
Start of prefixes, only alter config
=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+
*/

const fs = require("fs")
const botConfig = JSON.parse(fs.readFileSync('config.json', 'utf8'));
const prefix = botConfig["prefix"]

const config = {

	name: "help", //name of module (no .js)

	version:"1.0.1", //version

	commands: ["*"], //commands without prefix

	description: "general help command, opens this", //description (this shows up in help)

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




async function main_(content, command, messageObj, prefix){
		if (command == "help"){
			let send = ""
			let data = JSON.parse(fs.readFileSync('lib/modules.json', 'utf8'));
			for (const [ key, value ] of Object.entries(data)) {
				send += "**" + prefix + value["name"] + "**: " + value["description"] + "\n" 
			}


			messageObj.channel.send({embed: {color: parseInt(botConfig.botColor), title: "Ubi help", description: send}})
		}

	//Your code. Use if or switch statements to alter between the different command types you listed in config.commands.
}



//Export functions
