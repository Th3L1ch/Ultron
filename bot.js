var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '\'') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
            // !ping
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
            break;
			// Return user name
			case 'whoami':
				bot.sendMessage({
					to: channelID,
					message: 'According to my logs you are '+ user+ ', but you knew that already, right?'
				});
			break;
			// Return channel ID - not useful, commenting out
			//case 'whereami':
			//	bot.sendMessage({
			//		to: channelID,
			//		message: 'You are at channelID:'+ channelID + ', and we're thrilled to have you'
			//	});
			//break;
			// Join voice channel
			case 'join':
				bot.sendMessage({
					to: channelID,
					message: 'I can\'t join the channel yet, but I\'ll be able to soon!'
				});
			break;
			case 'help':
				bot.sendMessage({
					to: channelID,
					message: 'Lol no, fuck you. \n \:pupper\: '
				});
			break;
			deafult:
				bot.sendMessage({
					to: channelID,
					message: 'I think there was an error in that last command, I don\'t understand '+cmd+'. Please type ```\'help``` for a list of commands I can understand.'
				});
            // Just add any case commands if you want to..
         }
     }
});