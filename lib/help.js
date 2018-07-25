/*
=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+
Start of prefixes, only alter config
=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+
*/

const fs = require("fs")

const config = {

	name: "help", //name of module (no .js)

	version:"1.0.0", //version

	commands: ["*"], //commands without prefix

	description: "general help command" //description (this shows up in help)
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
		if (command == "help"){
			messageObj.channel.send("**Coming soon**")
		}

	//Your code. Use if or switch statements to alter between the different command types you listed in config.commands.
}



//Export functions
