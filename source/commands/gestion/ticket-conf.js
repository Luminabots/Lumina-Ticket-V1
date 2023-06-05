const Discord = require('devland.js');
const Lumina = require('../../structures/client/index');
const {Embed, ActionRow, StringSelect} = require('devland.js');
module.exports = {
    name: "ticket-conf",
    default_member_permissions: ["ADMINISTRATOR"],
         /**
     * 
     * @param {Lumina} client 
     * @param {Discord.Message} message
     * @param {string[]} args 
     */
    run: async(client, message) => {
        let confr = message.guild.roles.get(client.db.get(`${message.guild.id}_tperm`))

        if (!message.member.roles.includes(confr.id)) {
            return message.reply("Vous n'avez pas le rôle requis pour la configuration des tickets")
        }
       
        let trole = message.guild.roles.get(client.db.get(`${message.guild.id}_trole`))
       const bot = new Embed()
       bot.title = `${message.author.username} Configuration des tickets !`
       bot.fields = [{
        name: "Logs Ticket",
        value: `${client.textChannels.get(client.db.get(`ticketlog_${message.guild.id}`))}`,
       },
       {
        name: "Catégorie Ticket",
        value: `${client.categoryChannels.get(client.db.get(`${message.guild.id}_categorie`))}`,
       },
        {
        name: "Role Ticket",
        value: `${message.guild.roles.get(client.db.get(`${message.guild.id}_trole`))}`,
       },
       {
        name: "Version du Bot",
        value: `${client.config.version}`,
       }   
    ]
    bot.footer = client.config.footer
    bot.color = client.config.default_color
    let select = new StringSelect()
    select.placeholder = "Fais un choix"
    select.customId = "bot"
    select.min_values = 1
    select.max_values = 1
    select.options = [{
        label: "Logs",
        description: "Change le channel de logs ticket du bot (requis)",
        value: "logs"
    }, {
        label: "Catégorie",
        description: "Change le catégorie ticket du bot (requis)",
        value: "categorie"
    }, {
        label: "Role",
        description: "Change le role ticket du bot (requis)",
        value: "trole"
    }]
    const row = new ActionRow(select)
    let msg = await message.reply({embeds: [bot], components: [row]})

    const collector = (await msg).createComponentsCollector({filter: (m) => m.userId === message.authorId})
    collector.on("collected", async (i) => {
        i.deferUpdate()
        if (i.customId === "bot") {
            if (i.values[0] === "logs") {
                const question = await message.channel.send({content: "Veuillez saisir le salon de logs tickets (id)!"})
                const filter = (m) => message.author.id === m.author.id;
                i.channel.awaitMessages({filter, max: 1, time: 1000 * 10 * 6, errors: ['time']}).then(cld => {
                    question.delete()
                   let channel = cld.first().content
                    client.db.set(`ticketlog_${message.guild.id}`, cld.first().content)
                    i.followUp({content: "Channel des logs de ticket mis à jour avec succès : \n" + `<#${channel}>`})
                    const bot = new Embed()
                    bot.title = `${message.author.username} Configurationn des tickets !`
                    bot.fields = [{
                     name: "Logs Ticket",
                     value: `${client.textChannels.get(client.db.get(`ticketlog_${message.guild.id}`))}`,
                    },
                    {
                     name: "Catégorie Ticket",
                     value: `${client.categoryChannels.get(client.db.get(`${message.guild.id}_categorie`))}`,
                    },
                     {
                     name: "Role Ticket",
                     value: `${message.guild.roles.get(client.db.get(`${message.guild.id}_trole`))}`,
                    },
                    {
                     name: "Version du Bot",
                     value: `${client.config.version}`,
                    }   
                 ]
                 bot.footer = client.config.footer
                 bot.color = client.config.default_color
                 msg.edit({embeds: [bot], components: [row]})
                })
            }
            if (i.values[0] === "categorie") {
                const question = await message.channel.send({content: "Veuillez saisir la categorie des tickets (id)!"})
                const filter = (m) => message.author.id === m.author.id;
                i.channel.awaitMessages({filter, max: 1, time: 1000 * 10 * 6, errors: ['time']}).then(cld => {
                    question.delete()
                    client.db.set(`${message.guild.id}_categorie`, cld.first().content)
                    i.followUp({content: "Catégorie des tickets mis à jour avec succès : \n" + cld.first().content})

                    const bot = new Embed()
                    bot.title = `${message.author.username} Configuration des tickets !`
                    bot.fields = [{
                     name: "Logs Ticket",
                     value: `${client.textChannels.get(client.db.get(`ticketlog_${message.guild.id}`))}`,
                    },
                    {
                     name: "Catégorie Ticket",
                     value: `${client.categoryChannels.get(client.db.get(`${message.guild.id}_categorie`))}`,
                    },
                     {
                     name: "Role Ticket",
                     value: `${trole.name}`,
                    },
                    {
                     name: "Version du Bot",
                     value: `${client.config.version}`,
                    }   
                 ]
                 bot.footer = client.config.footer
                 bot.color = client.config.default_color
                 msg.edit({embeds: [bot], components: [row]})
                })
            }
            if (i.values[0] === "trole") {
                const question = await message.channel.send({content: "Veuillez saisir le role ticket du bot (id)!"})
                const filter = (m) => message.author.id === m.author.id;
                i.channel.awaitMessages({filter, max: 1, time: 1000 * 10 * 6, errors: ['time']}).then(cld => {
                    question.delete()
                    let role = cld.first().content 
                    client.db.set(`${message.guild.id}_trole`, cld.first().content)
                    i.followUp({content: "Role ticket mis à jour avec succès : \n" + role})
                    const bot = new Embed()
                    bot.title = `${message.author.username} Configurationn des tickets !`
                    bot.fields = [{
                     name: "Logs Ticket",
                     value: `${client.textChannels.get(client.db.get(`ticketlog_${message.guild.id}`))}`,
                    },
                    {
                     name: "Catégorie Ticket",
                     value: `${client.categoryChannels.get(client.db.get(`${message.guild.id}_categorie`))}`,
                    },
                     {
                     name: "Role Ticket",
                     value: `${message.guild.roles.get(client.db.get(`${message.guild.id}_trole`))}`,
                    },
                    {
                     name: "Version du Bot",
                     value: `${client.config.version}`,
                    }   
                 ]
                 bot.footer = client.config.footer
                 bot.color = client.config.default_color
                 msg.edit({embeds: [bot], components: [row]})
                })
            }
        }
    })
    }
}