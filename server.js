require('isomorphic-fetch');
const atob = require("atob");
const fs = require("fs");
const Discord = require("discord.js");
const client = new Discord.Client();
const Dropbox = require('dropbox').Dropbox;
const dbx = new Dropbox({ accessToken: 'fB7bjlg_BfAAAAAAAAAABxlCCkw4EGdBB_1CMnebb5TDyswSDAmR1I-6rwrrhwhS' });


//Dropbox save functions

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

var writeFileSync = function (path, buffer, callback) {
    permission = 438; // 0666
    var fileDescriptor;

    try {
        fileDescriptor = fs.openSync(path, 'w', permission);
    } catch (e) {
        fs.chmodSync(path, permission);
        fileDescriptor = fs.openSync(path, 'w', permission);
    }

    if (fileDescriptor) {
        fs.writeSync(fileDescriptor, buffer, 0, buffer.length, 0);
        fs.closeSync(fileDescriptor);
        return callback()
    }
}


function load(path, callback){
	dbx.filesDownload({path: "/" + path})
	  .then(function(response) {
	  	writeFileSync(response["name"], response["fileBinary"], function(){
			try{
			  	return callback(JSON.parse(fs.readFileSync(path, 'utf8')))
			} catch(e) {
			  	return callback("Invalid JSON")
			}
		 })
	 

	  })
	  .catch(function(error) {
	    return callback("File not found")
	  });
	}
function save(data, path, callback){
		dbx.filesDelete({path: "/" + path}).then(function(response){
			fs.writeFile(path, JSON.stringify(data), (error) => {});
			var buffer = fs.readFileSync(path)
			dbx.filesUpload({contents: buffer, path:"/" + path}).then(function(response){
				return callback(true)
			})
			.catch(function(error){
				return callback(false)

			});
		})
		.catch(function(error){
			fs.writeFile(path, JSON.stringify(data), (error) => {});
			var buffer = fs.readFileSync(path)
			dbx.filesUpload({contents: buffer, path:"/" + path}).then(function(response){
				return callback(true)
			})
			.catch(function(error){
				return callback(false)
			});
		})

}

//Discord Events


client.on("ready", function(){
	console.log("ubi online")
});

client.on("message", async function(message){
	if (message.author.id != client.user.id){
		if (message.content == "ubi change"){
			save({"data" : getRndInteger(0, 100)}, "number.json", function(e){
				if (e){
					message.channel.send("Changed number! Check dropbox now.")
				}else{
					message.channel.send("Error. Something happened.")
				}
			})
		}
	}
})

client.login(process.env.BOT_TOKEN);