const Discord = require('devland.js')

module.exports = {
    name : "luminabots",

    run: async(client, message) => {
        
    
   

        const embed = new Discord.Embed()
        embed.description = `[Cliquez pour rejoindre le support LuminaBots](${client.config.support})`
        embed.color = client.config.default_color,
        embed.footer = client.config.footer
        message.channel.send({embeds: [embed]})
    }
}