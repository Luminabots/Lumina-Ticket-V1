const Discord = require("devland.js");
const Lumina = require('../../structures/client/index');

module.exports = {
    data : new Discord.GuildCommand({
        name: "about",
        description: "About the bot",
        type: 1
    }),
    run : async(client, interaction) => {
      await interaction.deferReply({ ephemeral: true }).catch(e => { })
        const embed = new Discord.Embed();
        embed.title = client.user.username,
          embed.fields = [
            {
              name: `Devlopper`,
              value: `<@1072553881134972970>`,
              inline: true,
            },
            {
              name: `Node.js`,
              value: `\`${process.versions.node}\``,
              inline: true,
            }, {
                name: `Devland.js`,
                value: `\`${Discord.version}\``,
                inline: true
            },
            {
              name: `Servers`,
              value: `\`${client.guilds.size}\``,
              inline: true,
            },
            {
              name: `Users`,
              value: `\`${client.users.size}\``,
              inline: true,
            },
            {
              name: `Ping`,
              value: `\`${client.ws.ping}ms\``,
              inline: true,
            },
            {
              name: `Support`,
              value: `[Clique ici](https://discord.gg/luminabots)`,
              inline: true,
            },{
                name: `Uptime`,
                value: `<t:${(Date.now()-client.uptime).toString().slice(0, -3)}:R>`,
                inline: true
            }
          ],
          embed.url = "https://discord.gg/luminabots",
          embed.color = client.config.default_color;
        embed.footer = client.config.footer;
        interaction.followUp(embed);
    }
}