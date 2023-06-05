const Discord = require('devland.js');
const Lumina = require('../../structures/client/index');
const {GuildCommand} = require('devland.js')
module.exports = {
    data: new GuildCommand({
        name: "ticket",
        type: 1,
        description: "setup ticket "
    }),
    run: async(client, interaction) => {
        if (client.config.buyers.includes(interaction.user.id) || client.db.get(`owner_${interaction.user.id}`)) {
        await interaction.deferReply().catch(e => { })
        let tick = new Discord.Embed()
        tick.color = client.config.default_color
        tick.title = "Ticket " + interaction.guild.name
        tick.description = `**Pour ouvrir un Ticket cliquez sur le bouton ci-dessous**`
        tick.footer = client.config.footer

        let button = new Discord.Button()
        button.style = 1
        button.customId = "ticketo"
        button.emoji = "📧"

        const row = new Discord.ActionRow(button)

        interaction.followUp({embeds: [tick], components: [row], ephemeral: false})
        }
    }
}