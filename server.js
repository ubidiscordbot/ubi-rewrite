require('dotenv').config({path: "variables.env"})
require('isomorphic-fetch');
const fs = require("fs");
const Discord = require("discord.js");
const client = new Discord.Client();
const Dropbox = require('dropbox').Dropbox;
const dbx = new Dropbox({ accessToken: process.env.DROPBOX_TOKEN});
const { exec } = require("child_process")
const firebase = require("firebase")
require('http').createServer().listen(3000)

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

//Dropbox save functions

String.prototype.insert = function (index, string) {
  if (index > 0)
    return this.substring(0, index) + string + this.substring(index, this.length);
  else
    return string + this;
};



function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}


  var config = {
    apiKey: process.env.FIREBASE_APIKEY, //process.env.FIREBASE_APIKEY
    authDomain: process.env.FIREBASE_AUTHDOMAIN, //process.env.FIREBASE_AUTHDOMAIN
    databaseURL: process.env.FIREBASE_DATABASEURL, //process.env.FIREBASE_DATABASEURL
    storageBucket: process.env.FIREBASE_STORAGEBUCKET //process.env.FIREBASE_STORAGEBUCKET
  };


  firebase.initializeApp(config);

  // Get a reference to the database service

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


		client.on("ready", function(){
			console.log(`Logged in as ${client.user.tag}`)
		});

		client.on("message", async function(message){
			if (message.author.id != client.user.id){

				if (message.content.startsWith("!change")){

					save("/global/number/", getRndInteger(1, 100), function(e){
						
						if (e){

							message.channel.send("Changed number! Check Firebase.")
						}else{

							message.channel.send("Error. Something happened.")
						}
					})

				}else if (message.content === '!avatar') {
    				message.reply(message.author.avatarURL);

				}else if (message.content.startsWith("!nexec ")){


					//Allows users to run commands via chat

					if (!(message.content.toLowerCase().includes("process.env."))){
						if (!(message.content.toLowerCase().includes("require("))){
						let jsout = "";
						let script = parseCommand(message.content.slice(7).replaceAll('"', "'"))
						child = exec('node -e "' +  script + '"' )
						message.channel.send("```css\nRunning...```");

						
						child.stdout.on('data', (data) => {
			  				jsout += data.toString()
						});


						child.on("close", function(){
							message.channel.send("```css\n" + jsout + "\nDone!```");
						})


						child.stderr.on('data', (data) => {
							var nd = data.toString().split("\n")
						    jsout += data.replace(nd[0], "").replace(nd[1], message.content.slice(6) + "\n")
						});
						}else{
							message.channel.send("```css\nPackage access denied```");
						}
					}else{
						message.channel.send("```css\nError: Enviorment variable access denied```");
					}


				}
			}
		})

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

		client.login(process.env.BOT_TOKEN)


})


//Discord Events

