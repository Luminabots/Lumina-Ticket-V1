const Discord = require('devland.js');
const Lumina = require('../../structures/client/index');
const {Embed, ActionRow, StringSelect} = require('devland.js');
module.exports = {
    name: "perms",
    default_member_permissions: ["ADMINISTRATOR"],
         /**
     * 
     * @param {Lumina} client 
     * @param {Discord.Message} message
     * @param {string[]} args 
     */
    run: async(client, message) => {
        if (client.config.buyers.includes(message.authorId) || client.db.get(`owner_${client.user.id}_${message.authorId}`)){
        let tperm = message.guild.roles.get(client.db.get(`${message.guild.id}_tperm`))
        let embed = new Embed()
        embed.title = "Configuration permissions de : " + message.guild.name
        embed.fields = [{
            name: `PermTicket`,
            value: "Permission permettant de configurer le système ticket"
        }
    ]
        embed.footer = client.config.footer 
        embed.color = client.config.default_color

        let select = new StringSelect()
        select.placeholder = "Fais ton choix"
        select.customId = "perms"
        select.min_values = 1 
        select.max_values = 1
        select.options = [{
            label: "PermTicket",
            description: "Permission permettant de configurer le système ticket",
            value: "permt"
        }, {
            label: "PermList",
            description: "Liste des permissions",
            value: "permlist"
        }]

        let row = new ActionRow(select)

        const msg = await message.channel.send({embeds: [embed], components: [row]})

        let collector = (await msg).createComponentsCollector({filter: (m) => m.userId === message.authorId})

        collector.on('collected', async (i) => {
            i.deferUpdate();
            if (i.customId === "perms") {
                if (i.values[0] === "permt") {
                    const question = await message.channel.send({content: "Veuillez saisir le role qui aura la permission de configurer le système ticket (id) !"})
                    const filter = (m) => message.author.id === m.author.id;
                    i.channel.awaitMessages({filter, max: 1, time: 1000 * 10 * 6, errors: ['time']}).then(cld => {
                        question.delete()
                        let role = cld.first().content 
                        client.db.set(`${message.guild.id}_tperm`, cld.first().content)
                        i.followUp({content: "Role ticket mis à jour avec succès : \n" + `${role}`})
                        const bot = new Embed()
                        bot.title = "Configuration permissions de :" + message.guild.name
                        bot.fields = [{
                         name: `PermTicket`,
                         value: `${tperm.name}`
                        }]
                     bot.footer = client.config.footer
                     bot.color = client.config.default_color
                     msg.edit({embeds: [bot], components: [row]})
                    })
                }
                if (i.values[0] === "permlist") {
                    const bot = new Embed()
                    bot.title = "Configuration permissions de :" + message.guild.name
                    bot.fields = [{
                     name: `PermTicket`,
                     value: `${tperm.name}`
                    }]
                 bot.footer = client.config.footer
                 bot.color = client.config.default_color
                 message.channel.send({embeds: [bot]})
                } 
            }
        })
        }
    }
}
