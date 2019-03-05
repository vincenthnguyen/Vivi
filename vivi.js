const Discord = require('discord.js')
const client = new Discord.Client()

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

    var generalChannel = client.channels.get("552272100946084029") // Replace with known channel ID

    // Example of sending a messsage
    generalChannel.send("Sugoi~!")

    // ----- Images/Attachments -----

    // Provide a path to a local file
    //const localFileAttachment = new Discord.Attachment('D:\\logo.png')
    //generalChannel.send(localFileAttachment)

    // Provide a URL to a file
    const webAttachment = new Discord.Attachment('https://vinh.moe/images/dancing.gif')
    generalChannel.send(webAttachment)
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

    // ping loop
    if (pinging) {
        loop();
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
        receivedMessage.channel.bulkDelete(1)
        receivedMessage.channel.send(receivedMessage.content.substr(13))
    } else {
        receivedMessage.channel.bulkDelete(1)
        receivedMessage.channel.send("Oops, I can't repeat nothing.")
    }
}

var pinging;
var target;

function pingCommand(arguments, receivedMessage) {
    if (arguments.length > 0) {
        if (receivedMessage.mentions.members.first().toString() != "") {
                pinging = true;
                target = receivedMessage;
        } else {
            receivedMessage.channel.send("Oops, I couldn't find " + arguments)
        }

    } else {
        receivedMessage.channel.send("Oops, I need a name to ping someone.")
    }
}

function loop() {
    //var interval = (10*1000) + (Math.floor( (Math.random()*20)+1 )*1000);
    var interval = 2*1000;
    if (pinging) {
        setTimeout(function() {
            ping(target);
            loop();
        }, interval)
    }
}

function ping(receivedMessage) {
    var mentioned = receivedMessage.mentions.members.first().toString()
    console.log("Sending ghost ping to " + receivedMessage.content)
    receivedMessage.channel.send(mentioned)
    receivedMessage.channel.bulkDelete(1)
}

function noPingCommand(arguments, receivedMessage) {
    pinging = false;
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

bot_secret_token = "NTUyMjcyMzk2OTk2ODM3Mzgz.D2Aruw.nx-5-Dk_FOJG-0Mj_U-U-sORbe8"

client.login(bot_secret_token)