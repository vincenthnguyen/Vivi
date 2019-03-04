const Discord = require('discord.js')
const client = new Discord.Client()

client.on('ready', () => {
    console.log("Connect as " + client.user.tag)
})

// Get your bot's secret token from:
// https://discordapp.com/developers/applications/
// Click on your application -> Bot -> Token -> "Click to Reveal Token"

bot_secret_token = "NTUyMjcyMzk2OTk2ODM3Mzgz.D19KGA.tesJ_jj3OY70BK4oA7udoHqSpNY"

client.login(bot_secret_token)