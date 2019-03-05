const Discord = require('discord.js')
const client = new Discord.Client()

// Runs right when the program starts
client.on('ready', () => {
    console.log("Connected as " + client.user.tag)

    // Set bot status to: "Playing with JavaScript"
    client.user.setActivity("to >help", {type: "LISTENING"})
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
        receivedMessage.channel.send(arguments)
    } else {
        receivedMessage.channel.send("Oops, I can't repeat nothing.")
    }
}

function pingCommand(arguments, receivedMessage) {
    if (arguments.length > 0) {
        if (receivedMessage.mentions.members.first().toString() != "") {
            receivedMessage.channel.send(receivedMessage.mentions.members.first().toString())
            receivedMessage.channel.bulkDelete(1)
        } else {
            receivedMessage.channel.send("Oops, I couldn't find " + arguments)
        }

    } else {
        receivedMessage.channel.send("Oops, I need a name to ping someone.")
    }
}

// Get your bot's secret token from:
// https://discordapp.com/developers/applications/
// Click on your application -> Bot -> Token -> "Click to Reveal Token"

bot_secret_token = "NTUyMjcyMzk2OTk2ODM3Mzgz.D19KGA.tesJ_jj3OY70BK4oA7udoHqSpNY"

client.login(bot_secret_token)