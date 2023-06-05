const Discord = require('devland.js');
const Lumina = require('../../structures/client/index');
const {GuildCommand} = require('devland.js')
module.exports = {
    data: new GuildCommand({
        name: "luminabots",
        type: 1,
        description: "Avoir le support du bot"
    }),
    run: async(client, interaction) => {
        await interaction.deferReply().catch(e => { })
        const waitingEmbed = new Discord.Embed()
        waitingEmbed.description = `[Cliquez pour rejoindre le support LuminaBots](${client.config.support})`
        waitingEmbed.color = client.config.default_color
        waitingEmbed.footer = client.config.footer
        interaction.followUp(waitingEmbed)
    }
}