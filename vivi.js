const Discord = require('discord.js');
const client = new Discord.Client();
const key = require('./key.js');

// Runs right when the program starts
client.on('ready', () => {
    console.log("Connected as " + client.user.tag)

    // Set bot status to: "Playing with JavaScript"
    client.user.setActivity(">help", {type: "LISTENING"})
    // Alternatively, you can set the activity to any of the following:
    // PLAYING, STREAMING, LISTENING, WATCHING
    // For example:
    // client.user.setActivity("TV", {type: "WATCHING"})

    // List servers the bot is connected to
    console.log("Servers:")
    client.guilds.forEach((guild) => {

        console.log(" - " + guild.name)
        // List all channels
        guild.channels.forEach((channel) => {
            console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`)
        })

    })
})

// Runs on message reply
client.on('message', (receivedMessage) => {
    // Prevent bot from responding to its own messages
    if (receivedMessage.author == client.user) {
        return
    }

    // Check if the bot's user was tagged in the message
    if (receivedMessage.content.includes(client.user.toString())) {
        // Send acknowledgement message
        receivedMessage.channel.send("Message received from " +
            receivedMessage.author.toString() + ": " + receivedMessage.content)
    }

    // Command processing
    if (receivedMessage.content.startsWith(">")) {
        processCommand(receivedMessage)
    }
})

// Functions/Methods
function processCommand(receivedMessage) {
    let fullCommand = receivedMessage.content.substr(1) // Remove the leading exclamation mark
    let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command
    let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command

    console.log("Command received: " + primaryCommand)
    console.log("Arguments: " + arguments) // There may not be any arguments

    if (primaryCommand == "help") {
        helpCommand(arguments, receivedMessage)
    } else if (primaryCommand == "repeat") {
        repeatCommand(arguments, receivedMessage)
    } else if (primaryCommand == "ping") {
        pingCommand(arguments, receivedMessage)
    } else if (primaryCommand == "noping") {
        noPingCommand(arguments, receivedMessage)
    } else if (primaryCommand == "clear") {
        clearCommand(arguments, receivedMessage)
    } else if (primaryCommand == "ghostrepeat") {
        ghostRepeatCommand(arguments, receivedMessage)
    } else {
        receivedMessage.channel.send("I don't understand that command. Try using `>help` : D")
    }
}

function helpCommand(arguments, receivedMessage) {
    if (arguments.length > 0) {
        receivedMessage.channel.send("Oops, I don't know much about " + arguments)
    } else {
        receivedMessage.channel.send("I'm not sure what you need help with. Try using `>help [topic]`")
    }
}

function repeatCommand(arguments, receivedMessage) {
    if (arguments.length > 0) {
        receivedMessage.channel.send(receivedMessage.content.substr(8))
    } else {
        receivedMessage.channel.send("Oops, I can't repeat nothing.")
    }
}

function ghostRepeatCommand(arguments, receivedMessage) {
    if (arguments.length > 0) {
        var msg = receivedMessage.content.substr(13);
        receivedMessage.delete();
        receivedMessage.channel.send(msg);
    } else {
        receivedMessage.channel.send("Oops, I can't repeat nothing.")
    }
}

function pingCommand(arguments, receivedMessage) {
    if (arguments.length > 0) {
        if (receivedMessage.mentions.members.first().toString() != "") {
            var mentioned = receivedMessage.mentions.members.first().toString();
            console.log("Sending ghost pings to " + mentioned);
            const interval = setInterval(function() {
                receivedMessage.channel.send(mentioned).then(sentMessage => {
                    sentMessage.delete(1000);
                }).catch(err => {
                    console.error(err);
                    clearInterval(interval);
                });
            }, 1000);
            receivedMessage.delete(1000);
            task = interval;
        } else {
            receivedMessage.channel.send("Oops, I couldn't find " + arguments);
        }
    } else {
        receivedMessage.channel.send("Oops, I need a name to ping someone.");
    }
}

function noPingCommand(arguments, receivedMessage) {
    clearInterval(task);
    receivedMessage.channel.send("Ping command cleared~!")
}

function clearCommand(arguments, receivedMessage) {
    var toBeCleared = 0;
    if (arguments.length == 1) {
        toBeCleared = parseFloat(arguments[0])
    } else {
        toBeCleared = 100;
    }
    receivedMessage.channel.bulkDelete(toBeCleared)
    receivedMessage.channel.send("Channel cleared~! " + toBeCleared + " messages deleted~")
}

// Get your bot's secret token from:
// https://discordapp.com/developers/applications/
// Click on your application -> Bot -> Token -> "Click to Reveal Token"

const bot_secret_token = key.getKey();

client.login(bot_secret_token)