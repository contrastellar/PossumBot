// noinspection JSIgnoredPromiseFromCall

const {Client, RichEmbed, MessageAttachment } = require('discord.js');
const fs = require('fs');
const chalk = require('chalk');
console.clear();
let token;

try{
    token = fs.readFileSync('DiscordToken.txt', 'utf8');
}catch(error){
    console.log(chalk.red("No file exists for 'DiscordToken.txt'"));
}
// Create an instance of a Discord client.
const client = new Client();
client.login(token); //the login info...

//Constants for emojis?

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
    client.user.setPresence({activity: {name: '!PCCommands'}, status: 'online'}).then(r => console.log(chalk.green("aaaaaaaa")));

});

client.on("message", msg => {
    if (msg.content.startsWith("!PBCommands")){
        msg.reply("aaaaaaaa");
        msg.channel.send("I can !possum and !raccoon");
    }
    if (msg.content.startsWith("!raccoon")) {
        fs.readdir('./img/raccoon/', (err, files) => {
            let num = Math.floor(Math.random() * files.length) + 1;
            console.log("Fetching meme #" + num + ", Number of files: " + files.length);
            const attachment = new MessageAttachment('./img/raccoon/' + num + '.png');
            msg.channel.send(attachment);
        });
    } else if (msg.content.startsWith("!possum")) {
        fs.readdir('./img/possum/', (err, files) => {
            let num = Math.floor(Math.random() * files.length) + 1;
            console.log("Fetching meme #" + num + ", Number of files: " + files.length);
            const attachment = new MessageAttachment('./img/possum/' + num + '.png');
            msg.channel.send(attachment);
        });

    } else if (msg.content.startsWith('!admin')) { //admin-only commands

        if (msg.author.id !== '181187505448681472') { //verifies that Contrastellar#0001 is the only user to do this.
            msg.channel.send('AAAAAAAAAAA'); //clowns on a fool

        } else {
            console.log(chalk.yellow('<REPORT> ') + msg.createdAt + ' good admin call from ' + msg.author.username);
            let arg = msg.content.slice(7);
            //above removes the !admin call
            //The following 'if' checks the next argument
            if (arg.startsWith('playstatus')) {
                arg = arg.slice(11);
                console.log(chalk.yellow('<REPORT> ') + 'status change call ');
                if (arg.length == 0) {
                    msg.reply('I need a new playing Status!');
                } else {
                    client.user.setPresence({game: {name: arg}});
                    console.log(chalk.red('<IMPORTANT> ') + 'The status was changed to "' + arg + '"');
                    console.log(chalk.yellow('<REPORT> ') + msg.createdAt + ' action performed by:' + msg.author.username);
                    msg.reply('status changed.').then();

                }
            } else if (arg.startsWith('onlinestatus')) {
                arg = arg.slice(13);
                if (arg.length == 0) {
                    msg.reply('I need an new online status! <online,dnd>');
                } else {
                    if (arg.toString() === "away") {
                        msg.reply("I do not support an 'away' status, please use online or dnd.").then()

                    } else {
                        client.user.setPresence({status: arg.toString()});
                        console.log(chalk.red('<IMPORTANT> ') + 'The online status was changed to "' + arg + '"');
                        msg.reply('online status changed.');
                    }
                }
            } else {
                msg.reply("I need a argument... \n USAGE - !admin <playstatus/onlinestatus/...>");
            }
        }
    }
});