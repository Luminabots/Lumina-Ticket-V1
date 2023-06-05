const { Client, Message } = require("devland.js");
const Lumina = require("../../structures/client/index");
const { Embed } = require("devland.js");
const fs = require("fs");
const ms = require("ms");
const Discord = require("devland.js");
/**
 * @param {Client} client
 * @param {Message} message
 */
module.exports = {
  name: "interaction",
  run: async (client, interaction) => {
    const guild = interaction.guild
    const claim = new Discord.Button()
    claim.customId = "claimt"
    claim.label = "Prendre en charge"
    claim.style = 1

    const close = new Discord.Button()
    close.customId = "close"
    close.label = "Fermer"
    close.style = 4

    const row = new Discord.ActionRow(claim, close)

    const ticklog = client.db.get(`ticketlog_${interaction.guild.id}`)
    let ticketrole = client.db.get(`${interaction.guild.id}_trole`)
    if (ticketrole === null) tickrole = client.user.id

    let num = client.db.get(`ticketnum_${interaction.guild.id}` || 0);

    if (interaction.customId === "close") {
        interaction.reply({
            content: `Le ticket sera fermé dans **3 secondes** \n Numéro de ticket : **${num}**`,
            ephemeral: true
        })
        .then((channel) => {
            setTimeout(() => {
                            interaction.channel.delete()
                        }, 3000)
        })

        const closelog = new Discord.Embed()
        closelog.color = client.config.default_color
        closelog.title = `Ticket fermé`
        closelog.description = `Ticket : **__${interaction.channel.name}__**\n Numéro de ticket : **${num}**\n Fermé par : **${interaction.user.tag}**`

        const ticklogchannel =  client.textChannels.get(ticklog) || (await guild.fetchChannel(ticklog))
       if (ticklogchannel) ticklogchannel.send({ embeds: [closelog] })
    }

    else if (interaction.customId === "claimt") {
        
        if (interaction.channel.topic === interaction.user.id) {
            return interaction.reply({content: "Vous ne pouvez pas claim votre ticket", ephemeral: true})}
        const embed = new Discord.Embed()
        embed.color = client.config.default_color
        embed.description = `Ticket: ${interaction.channel} \n pris en charge par : \n <@${interaction.user.id}>`
        embed.footer = client.config.footer

        const claimed = new Discord.Button()
        claimed.customId = "claimed"
        claimed.label = "Claim par" + "\n" + interaction.user.username
        claimed.style = 4
        claimed.disabled = true

        const close = new Discord.Button()
        close.customId = "close"
        close.label = "Fermer"
        close.style = 4

                const row = new Discord.ActionRow(claimed, close)

                
                const allMessages = await interaction.channel.fetchMessages({
                    limit: 100,
                    botOnly: true
                })

                allMessages.forEach((message) => {
                    message.delete();
                  })

                  interaction.reply({
                    embeds: [embed],
                    components: [row],
                    ephemeral: false
                  })
        }

        
        
        if (interaction.customId === "ticketo") {
           
            let alhavet = (await guild.fetchTextChannels()).find((c) => c.topic === interaction.user.id)
            if (alhavet)
            { interaction.reply({
                content: `Vous avez déjà un ticket dans ce serveur`,
                ephemeral: true
            })
        }

          
        if (!alhavet) {
           
            let everyone = guild.everyoneRole

            client.db.add(`ticketnum_${interaction.guild.id}`, 1);

            let num = client.db.get(`ticketnum_${interaction.guild.id}` || 0);

            let categorie = client.db.get(`${interaction.guild.id}_categorie`)
            let catego = (await guild.fetchCategoryChannels()).find(c => c.id === categorie)
            if (catego === null) {
                guild.createChannel({
                    name: `ticket-${num}`,
                    type: Discord.channelType.GUILD_TEXT,
                    topic: interaction.user.id,
                    permission_overwrites: [{
                        type: Discord.PermissionIdType.USER,
                        id: interaction.user.id,
                        allow: ["VIEW_CHANNEL", "SEND_MESSAGES"]
                    }, {
                        type: Discord.PermissionIdType.ROLE,
                        id: ticketrole,
                        allow: ["VIEW_CHANNEL", "SEND_MESSAGES"]
                    }, {
                        type: Discord.PermissionIdType.ROLE,
                        id: everyone.id,
                        deny: ["VIEW_CHANNEL", "SEND_MESSAGES"]
                    }]
                }).then(async (c) => {
                    const tick = new Discord.Embed()
                    tick.color = client.config.default_color
                    tick.title = `📧・Ticket`
                    tick.description = `<@${interaction.member.id}> Veuillez bien détailler votre requète pour qu\'un support du serveur vienne prendre en charge votre ticket.`
                    tick.footer = client.config.footer

                    let msgg = c.send({ embeds: [tick], components: [row], ephemeral: false })
                    interaction.reply({
                        content: `🔓 Votre ticket à été ouvert avec succès. <#${c.id}>`,
                        ephemeral: true,
                    })

                    const log = new Discord.Embed()
                    log.color = client.config.default_color
                    log.title = `Ticket ouvert`
                    log.description = `Ticket : **__${c.name}__**\n Numéro de ticket : **${num}**\n Ouvert par : **${interaction.user.tag}**`
                    log.footer = client.config.footer

                    const ticklogchannel =  client.textChannels.get(ticklog) || (await guild.fetchChannel(ticklog))
                    if (ticklogchannel) ticklogchannel.send({ embeds: [log] })

                })
            } else {
                guild.createChannel({
                    name: `ticket-${num}`,
                    type: Discord.channelType.GUILD_TEXT,
                    topic: interaction.user.id,
                    parent_id: catego.id,
                    permission_overwrites: [{
                        type: Discord.PermissionIdType.USER,
                        id: interaction.user.id,
                        allow: ["VIEW_CHANNEL", "SEND_MESSAGES"]
                    }, {
                        type: Discord.PermissionIdType.ROLE,
                        id: ticketrole,
                        allow: ["VIEW_CHANNEL", "SEND_MESSAGES"]
                    }, {
                        type: Discord.PermissionIdType.ROLE,
                        id: everyone.id,
                        deny: ["VIEW_CHANNEL", "SEND_MESSAGES"]
                    }]
                })
                .then(async (c) => {
                    const tick = new Discord.Embed()
                    tick.color = client.config.default_color
                    tick.title = `📧・Ticket`
                    tick.description = `<@${interaction.member.id}> Veuillez bien détailler votre requète pour qu\'un support du serveur vienne prendre en charge votre ticket.`
                    tick.footer = client.config.footer

                    let msgg = c.send({ embeds: [tick], components: [row], ephemeral: false })
                    interaction.reply({
                        content: `🔓 Votre ticket à été ouvert avec succès. <#${c.id}>`,
                        ephemeral: true,
                    })

                    const log = new Discord.Embed()
                    log.color = client.config.default_color
                    log.title = `Ticket ouvert`
                    log.description = `Ticket : **__${c.name}__**\n Numéro de ticket : **${num}**\n Ouvert par : **${interaction.user.tag}**`
                    log.footer = client.config.footer

                    const ticklogchannel =  client.textChannels.get(ticklog) || (await guild.fetchChannel(ticklog))
                    if (ticklogchannel) ticklogchannel.send({ embeds: [log] })
                })
            }

        }
    }
  }
};
