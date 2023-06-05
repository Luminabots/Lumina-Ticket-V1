const Discord = require('devland.js');
const Lumina = require('../../structures/client/index');
const {Embed, Button , ActionRow, StringSelect} = require('devland.js');
module.exports = {
    name: "setbot",
         /**
     * 
     * @param {Lumina} client 
     * @param {Discord.Message} message
     * @param {string[]} args 
     */
    run: async(client, message) => {
        if (client.config.buyers.includes(message.authorId) || client.db.get(`owner_${message.authorId}`)){
       const bot = new Embed()
       bot.title = `${message.author.username} Configurationn de votre Bot !`
       bot.fields = [{
        name: "Nom du Bot",
        value: `${client.user.username}`,
       },
       {
        name: "ID du Bot",
        value: `${client.user.id}`,
       },
        {
        name: "Avatar du Bot",
        value: `[Clique ici](${client.user.avatar})`,
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
        label: "Nom",
        description: "Change le nom du bot",
        value: "name"
    }, {
        label: "Avatar",
        description: "Change l'avatar du bot",
        value: "avatar"
    }]
    const row = new ActionRow(select)
    let msg = await message.reply({embeds: [bot], components: [row]})

    const collector = (await msg).createComponentsCollector({filter: (m) => m.userId === message.authorId})
    collector.on("collected", async (i) => {
        i.deferUpdate()
        if (i.customId === "bot") {
            if (i.values[0] === "name") {
                const question = await message.channel.send({content: "Veuillez saisir le nom du bot!"})
                const filter = (m) => message.author.id === m.author.id;
                i.channel.awaitMessages({filter, max: 1, time: 1000 * 10 * 6, errors: ['time']}).then(cld => {
                    question.delete()
                    if (cld.first().content === client.user.username) {
                        i.followUp({content: "Le nom du bot est déjà présent!"})
                        return
                    }
                    client.user.setName(cld.first().content)
                    i.followUp({content: "Le nom du bot a été changé" + ":" + cld.first().content})
                })
            }
            if (i.values[0] === "avatar") {
                const question = await message.channel.send({content: "Veuillez saisir l'avatar du bot!"})
                const filter = (m) => message.author.id === m.author.id;
                i.channel.awaitMessages({filter, max: 1, time: 1000 * 10 * 6, errors: ['time']}).then(cld => {
                    question.delete()
                    if (cld.first().content === client.user.avatar) {
                        i.followUp({content: "L'avatar du bot est déjà présent!"})
                        return
                    }
                    client.user.setAvatar(cld.first().content)
                    i.followUp({content: "L'avatar du bot a été changé" + ":" + cld.first().content})
                })
            }
        }
    })
    }
}
}
