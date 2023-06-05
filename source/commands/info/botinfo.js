const Discord = require('devland.js')
const {Embed} = require("devland.js")
module.exports = {
    name : "about",

    run: async(client, message) => {
        
    const embed = new Embed()
    embed.title = client.user.username
    embed.fields = [{
        name: `Devlopper`,
        value: `<@1072553881134972970>`,
        inline: true
    }, {
        name: `Node.js`,
        value: `\`${process.versions.node}\``,
        inline: true
    }, {
        name: "Serveurs",
        value: `\`${client.guilds.size}\``,
        inline: true
    }, {
        name: "Utilisateurs",
        value: `\`${client.users.size}\``,
        inline: true
    },{
        name: `Devland.js`,
        value: `${Discord.version}`,
        inline: true
    } ,{
        name: "Ping",
        value: `\`${client.ws.ping}ms\``,
        inline: true,
    }, {
        name: "Support",
        value: `[Clique ici](https://discord.gg/luminabots)`,
        inline: true
    }]
    embed.url = "https://discord.gg/luminabots"
    embed.color = client.config.default_color
    embed.footer = client.config.footer
    message.channel.send(embed)
    }
}