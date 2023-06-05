const Discord = require('devland.js');
const Lumina = require('../../structures/client/index');

module.exports = {
    name: "owner",
         /**
     * 
     * @param {Lumina} client 
     * @param {Discord.Message} message
     * @param {string[]} args 
     */
    run: async(client, message, args) => {
      if (client.config.buyers.includes(message.authorId) || client.db.get(`owner_${message.authorId}`)){
           
        const add = args[0] === "add";
        const remove = args[0] === 'remove';
        const clear = args[0] === 'clear';
        const list = args[0] === 'list';
        let color = client.db.get(`color_${message.guild.id}`);
        if (color == null) color = client.config.default_color;

        if (!add && !remove && !list && !clear) return message.channel.send("Liste des commandes owner: (owner add/remove/list/clear @' Tsubasa#1223)")

        if (add) {
            const member = message.memberMentions.first() || client.users.get(args[1])
            if (!member) return message.channel.send("Veuillez précisez le membre à owner")
            if (client.db.get(`owner_${client.user.id}_${member.id}`) === true) return message.channel.send(`\`ERREUR\` **${member}** est déjà dans la owner list`)
            client.db.set(`owner_${client.user.id}_${member.id}`, true)
            return message.channel.send(`\`SUCCÈS\` J'ai ajouté **${member}** à la owner list`)
        }

        if (remove) {
            const member = message.memberMentions.first() || client.users.get(args[1])
            if (!member) return message.channel.send("Veuillez précisez le membre à owner")
            if (client.db.get(`owner_${client.user.id}_${member.id}`) === true) return message.channel.send(`\`ERREUR\` **${member}** n'est pas dans la owner list`)
            client.db.delete(`owner_${client.user.id}_${member.id}`)
            return message.channel.send(`\`SUCCÈS\` J'ai retiré **${member}** de la owner list`)
        }

        if (list) {
            const data = client.db.all().filter(data => data.ID.startsWith(`owner_${client.user.id}`)).sort((a, b) => b.data - a.data);
            const count = 15;
        let p0 = 0;
        let p1 = count;
        let page = 1;
        let embed = new Discord.Embed()
        embed.title = `Liste des owners`
        embed.footer = client.config.footer
        embed.color = color
        embed.description = data.filter(x => message.guild.members.get(x.ID.split('_')[2])).slice(p0,p1).map((m, c) => { const user = client.users.get(m.ID.split('_')[2]);return  `**${c + 1}** | [${user.tag}](https://discord.com/users/${m.ID.split("_")[2]}) | (\`${m.ID.split("_")[2]}\`)`;
        }).join("\n") || "Aucun owner bot"

        message.channel.send(embed)
        }
        if (clear) {
            let embed = new Discord.Embed()
            embed.title = `Confirmation`
            embed.description = `Êtes-vous sûr de vouloir clear la owner list ?`
            embed.footer = client.config.footer
            embed.color = color

            let confirm = new Discord.Button()
            confirm.customId = 'confirm'
            confirm.emoji = '✅'

            let deny = new Discord.Button()
            deny.customId = 'deny'
            deny.emoji = '❌'

            let row = new Discord.ActionRow(confirm, deny)

            const msg = await message.channel.send({embeds: [embed], components: [row]})
        

            const collector = (await msg).createComponentsCollector({filter: (m) => m.userId === message.authorId})

            collector.on("collected", async (i) => {
                if (i.customId === 'confirm') {
                    try {
                        const data = client.db.all().filter(data => data.ID.startsWith(`owner_${client.user.id}`))
                        let clear = 0;
                        for (let i = 0; i < data.length; i++) {
                            client.db.delete(data[i].ID);
                            clear++;
                        };
                        msg.delete();
                        return message.channel.send(`\`SUCCÈS\` J'ai clear la owner list`).then(msg => msg.delete({timeout: 5000}));
                    } catch (e) {
                        console.log(e)
                return message.channel.send(`Oups une erreur a été détectée, je n'ai donc pas pu clear la owner list`)
                    }
                }
                if (i.customId === 'deny') {
                    msg.delete();
                    return message.channel.send("Je n'ai pas clear de la owner list").then(msg => msg.delete({timeout: 5000}));
                }
            })
         
        }
            }
        }
}
