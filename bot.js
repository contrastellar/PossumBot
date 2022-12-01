// noinspection JSIgnoredPromiseFromCall
const {Client, RichEmbed, MessageAttachment } = require('discord.js');
const fs = require('fs');
const chalk = require('chalk');
const { channel } = require('diagnostics_channel');
let token;

try{
	token = fs.readFileSync('/home/contrastellar/PossumBot/DiscordToken.txt', 'utf8');
}catch(error){
	console.log(chalk.red("No file exists for 'DiscordToken.txt'"));
}
// Create an instance of a Discord client.
const client = new Client();
client.login(token); //the login info...

function isHaydensServer(channelID, msg){
	let haydensServer = "293174849889763328";
	if(String(channelID) === haydensServer){
		return true;
	}
	msg.reply("https://youtube.com/shorts/7LU7FP8jhGE?feature=share");
	return false;
}



/**START**/
client.on('ready', () => {
	console.log(chalk.greenBright("Starting Here"));
	//reports login
	console.log(chalk.green('Logged in')+ ` as `+chalk.blue(`${client.user.tag}!`));
	console.log('Console '+chalk.cyan('START'));
	const bootStart = Date.now();
	//makes sure you're connected
	const ping = require('ping');
	//the hosts to test the ping for. this can be any viable host, however for the baseline, I've just used Google + Discord
	const hosts = ['google.com', 'discordapp.com'];

	function pingFunction(){
		hosts.forEach(function(host){
			const pStart = Date.now();
			ping.sys.probe(host, function(isAlive){
				const pFinish = Date.now();
				const pReport = pFinish - pStart;
				const activePing = isAlive ? chalk.gray(host) + ' is alive... report: ' + pReport + 'ms' : 'host ' + host + ' is dead';
				console.log(chalk.cyan('<STARTUP>')+' Ping Report ' + activePing);
			});
		});
	}

	//calls the ping function
	pingFunction();
	let bootFinish = Date.now(); //makes another timestamp
	let bootTime = (bootFinish - bootStart); //subtracts the ms values of the two vars
	console.log('Start-up time was...' + bootTime + 'ms'); //reports the time it took to boot the bot in ms
	client.user.setPresence({activity: {name: `aaaaaaa!`}, status: 'online'}).then(r => console.log(chalk.green("aaaaaaaa")));

});

function findPossum(msg, files){
	let num = Math.floor(Math.random() * files.length) + 1;
	console.log("Fetching possum #" + num + ", Number of files: " + files.length);
	let attachment;
	try{
		attachment = new MessageAttachment('/home/contrastellar/PossumBot/img/possum/' + num + '.png');

	}catch(err){
		console.error(err);
		msg.channel.send("Uh oh... You hit the exception possum...\nhttps://www.youtube.com/watch?v=bylC_0gumkk");
		msg.channel.send("You really fucked this up, this should be a goddamn debug message, but here we are.");
		msg.reply("Here's a new possum (hopefully)");
		return findPossum(files);

	}finally{
		msg.channel.send(attachment);

	}
}

client.on("message", msg => {
	if(msg.content.startsWith("!pccommands")) msg.reply("only !possum aaaaaa");

	if (msg.content.startsWith("!possum")) {
		fs.readdir('/home/contrastellar/PossumBot/img/possum/', (err, files) => {
			findPossum(msg, files);
		}
	)}

	else if(msg.content.startsWith('!vibe')){
		msg.channel.send("https://cdn.discordapp.com/attachments/547164475535523890/735923050696015903/1593712826771.mp4");

	}

	/*else if(msg.content.startsWith('') && msg.userid){

	}*/

	else if(msg.content.startsWith("!wheel")){
		msg.channel.send("https://cdn.discordapp.com/attachments/161297309978591233/903331498294390794/video0_13.mp4");
	}

	else if(msg.content.startsWith("!honk")){
		fs.readdir('./', (err, files) => {
			const attachment = new MessageAttachment('./img/HONK.jpg');
			msg.channel.send(attachment);
		});
	}
	else if(msg.content.startsWith("!metar")){
		msg.reply("WHAT THE FUCK IS WEATHER AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
	}
	//else if(msg.content.startsWith("!gabby")){
	//	msg.channel.send("aaa! <3");
	//}
	else if(msg.content.startsWith("!hayden") && isHaydensServer(msg.guild.id, msg)){
		msg.channel.send("aaa!!! <3");
	}
	else if(msg.content.startsWith("!bets")&& isHaydensServer(msg.guild.id, msg)){
		msg.channel.send("pat da puby!");
	}
	else if(msg.content.startsWith("!nick")&& isHaydensServer(msg.guild.id, msg)){
		msg.channel.send("https://cdn.discordapp.com/attachments/688916681132998692/962551485902770196/unknown.png")
	}
	if(msg.content.startsWith("!stroll")){
		msg.channel.send("https://cdn.discordapp.com/attachments/743621304246206494/937426290296881163/video0-5_1.mov")
	}

    if(msg.content.startsWith("!crypto")){
        msg.reply("https://cdn.discordapp.com/attachments/812580457719005206/926519160014516284/jpZySFGv8ZiWcX40.mp4");
    }
	if(msg.content.startsWith("!bigiron")){
		msg.channel.send("https://cdn.discordapp.com/attachments/307874761252274178/1047695524238725200/bigiron.mp4");
	}
});
