require('dotenv').config({path: "variables.env"})
require('isomorphic-fetch');
const fs = require("fs");
let modules = JSON.parse(fs.readFileSync('lib/modules.json', 'utf8'));
let moduleHolder = [[], []]




for (const [ key, value ] of Object.entries(modules)) {
	moduleHolder[value["name"]] = require("./lib/" + value["name"] + ".js")
}

const prefix = "."

const Discord = require("discord.js");
const client = new Discord.Client();
const firebase = require("firebase")

const http = require('http').createServer().listen(3000)

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

if (!String.prototype.splice) {
    /**
     * {JSDoc}
     *
     * The splice() method changes the content of a string by removing a range of
     * characters and/or adding new characters.
     *
     * @this {String}
     * @param {number} start Index at which to start changing the string.
     * @param {number} delCount An integer indicating the number of old chars to remove.
     * @param {string} newSubStr The String that is spliced in.
     * @return {string} A new string with the spliced substring.
     */
    String.prototype.splice = function(start, delCount, newSubStr) {
        return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
    };
}

String.prototype.insert = function (index, string) {
  if (index > 0)
    return this.substring(0, index) + string + this.substring(index, this.length);
  else
    return string + this;
};

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

const config = {
    apiKey: process.env.FIREBASE_APIKEY, //process.env.FIREBASE_APIKEY
    authDomain: process.env.FIREBASE_AUTHDOMAIN, //process.env.FIREBASE_AUTHDOMAIN
    databaseURL: process.env.FIREBASE_DATABASEURL, //process.env.FIREBASE_DATABASEURL
    storageBucket: process.env.FIREBASE_STORAGEBUCKET //process.env.FIREBASE_STORAGEBUCKET
};


firebase.initializeApp(config);

firebase.auth().signInWithEmailAndPassword(process.env.FIREBASE_INTERNALEMAIL, process.env.FIREBASE_INTERNALPASSWORD).then(function(user){

		function save(path, payload, callback){
  			firebase.database().ref(path).set(payload, function(e){
  				if (e){
  					return callback(false);
  				}else{
  					return callback(true);
  				}
  			});

		}
		
		function load(path, callback){
			firebase.database().ref(path).once('value').then(function(snapshot) {
			return callback(snapshot.val())
			  // ...
			});
		}


		/*=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+
				DISCORD FUNCTIONS
		=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=*/

		client.on("ready", function(){
			console.log(`Logged in as ${client.user.tag}`)
			client.user.setPresence({ status: 'online', game: { name: '.help to get started' } });
		});

		client.on("message", async function(message){

			if (message.author.id != client.user.id){
				if(message.content.startsWith(prefix)){
				let command = message.content.replace(prefix, "").split(" ")
				
				let command2 = message.content.replace(prefix, "").split(" ")

				if (modules[command[0]]["commands"].includes(command[1]) || modules[command[0]]["commands"][0] == "*"){

					if (!(modules[command[0]]["commands"][0] === "*")){

						command.splice(0, 2)

						moduleHolder[command2[0]].main(command.join(" "), command2[1], message)
					}else{

						command.shift()

						moduleHolder[command2[0]].main(command.join(" "), command2[0], message)

					}
				}
			}
		}
	});
});

client.login(process.env.BOT_TOKEN)


//Discord Events
