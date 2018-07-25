/*
=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+
Start of prefixes, only alter config
=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+
*/

const { exec } = require("child_process")
const fs = require("fs")

const config = {

	name: "nexec", //name of module

	version:"1.0.0", //version

	commands: ["run", "help"], //commands without prefix

	description: "Run javascript in discord. Use !nexec <javascript>" //description (this shows up in help)
}

function setup(){

	var data = JSON.parse(fs.readFileSync('lib/modules.json', 'utf8'));

	if (data[config.name] == undefined || data[config.name]["version"] != config.version){

		data[config.name] = config;

		fs.writeFile("lib/modules.json", JSON.stringify(data), (error) => {});

		console.log("Done setting up")
	
	}
}

setup(config)

module.exports = {
		main : main_
}



/*
=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+
End of prefixes ------------------------
=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+
*/




function main_(content, command, messageObj){

	if ((command) == "run"){

			if (!(content.toLowerCase().includes("process.env."))){
				
				if (!(content.toLowerCase().includes("require("))){
				
				let jsout = "";
				let script = parseCommand(content.replaceAll('"', "'"))
				
				child = exec('node -e "' +  script + '"' )
				messageObj.channel.send("```css\nRunning...```");

				
				child.stdout.on('data', (data) => {
	  				jsout += data.toString()
				});


				child.on("close", function(){
					messageObj.channel.send("```css\n" + jsout + "\nDone!```");
				})


				child.stderr.on('data', (data) => {
					var nd = data.toString().replaceAll("\n", "\n<split>").split("<split>")

					for (let i in nd){
						if (nd[i].startsWith(process.env.NEXECSCRIPT)){
							nd[i] = content;
						}
					}

				    jsout += nd.join("") + "\n"
				});

				}else{
					messageObj.channel.send("```css\nPackage access denied```");

				}
			}else{
				messageObj.channel.send("```css\nError: Enviorment variable access denied```");
			}

		}

	}
	//Your code. Use if or switch statements to alter between the different command types you listed in config.commands.

function parseCommand(cmd){
	//To prevent a loop from going on forever

	let x = cmd.replaceAll("{", "{<split>").split("<split>")

	//Adds sleep in loops and async in functions

	for (i in x){

		if (x[i].includes("while") || x[i].includes("for") || x[i].includes("do")){

			x.splice(parseInt(i) + 1, 0, "await sleep(10);");

		}else if (x[i].includes("function") && !(x[i].includes("async function"))){

			x[i] = x[i].insert(x[i].indexOf("function"), "async ")
		}
	}

	return (process.env.NEXECSCRIPT + x.join("") + "}")
}


//Export functions
