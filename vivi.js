const Discord = require('discord.js')
const client = new Discord.Client()

client.on('ready', () => {
    console.log("Connected as " + client.user.tag)
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
    generalChannel.send("Hello, world!")
})

// Get your bot's secret token from:
// https://discordapp.com/developers/applications/
// Click on your application -> Bot -> Token -> "Click to Reveal Token"

bot_secret_token = "NTUyMjcyMzk2OTk2ODM3Mzgz.D19KGA.tesJ_jj3OY70BK4oA7udoHqSpNY"

client.login(bot_secret_token)