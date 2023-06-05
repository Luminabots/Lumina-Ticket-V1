const Discord = require('devland.js');
const Lumina = require('../../structures/client/index');
const {GuildCommand} = require('devland.js')
module.exports = {
    data: new GuildCommand({
        name: "ping",
        type: 1,
        description: "Recuperer le ping du bot"
    }),
    run: async(client, interaction) => {
        await interaction.deferReply().catch(e => { })
        const waitingEmbed = new Discord.Embed()
        waitingEmbed.description = 'Latence du bot: \n' + client.ws.ping + 'MS'
        waitingEmbed.color = client.config.default_color
 
        interaction.followUp(waitingEmbed)
    }
}