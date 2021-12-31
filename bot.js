// noinspection JSIgnoredPromiseFromCall
const {Client, RichEmbed, MessageAttachment } = require('discord.js');
const fs = require('fs');
const chalk = require('chalk');
let token;

try{
    token = fs.readFileSync('DiscordToken.txt', 'utf8');
}catch(error){
    console.log(chalk.red("No file exists for 'DiscordToken.txt'"));
}
// Create an instance of a Discord client.
const client = new Client();
client.login(token); //the login info...



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

client.on("message", msg => {

    if(msg.content.startsWith("!pccommands")) msg.reply("only !possum aaaaaa");

    if (msg.content.startsWith("!possum")) {
        fs.readdir('./img/possum/', (err, files) => {
            let num = Math.floor(Math.random() * files.length) + 1;
            console.log("Fetching possum #" + num + ", Number of files: " + files.length);
            const attachment = new MessageAttachment('./img/possum/' + num + '.png');
            msg.channel.send(attachment);
        });

    }
    else if(msg.content.startsWith('!vibe')){
		msg.channel.send("https://cdn.discordapp.com/attachments/547164475535523890/735923050696015903/1593712826771.mp4");
		
	}

    if(msg.content.startsWith("!wheel")){
        msg.channel.send("https://cdn.discordapp.com/attachments/161297309978591233/903331498294390794/video0_13.mp4");
    }

	if(msg.content.startsWith("!wheel")){
        msg.channel.send("https://cdn.discordapp.com/attachments/812580457719005206/926608342430908417/porb.png");
    }

    if(msg.content.startsWith("!honk")){
        fs.readdir('./', (err, files) => {
            const attachment = new MessageAttachment('./img/HONK.jpg');
            msg.channel.send(attachment);
        });
    }

    if(msg.content.startsWith("//!info")){
        //TODO fix embed constructor
        const embed = new RichEmbed();
            embed.setTitle('new possum who dis').setColor(0x29a329)
            .setDescription('PossumBot. Screams. Posts Possums. \n' +
                'Please be nice. !possum. \n' +
                'Version: Possum-1.0');
        msg.channel.send(embed);
    }
});
