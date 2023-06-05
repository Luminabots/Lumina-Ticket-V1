const Discord = require('devland.js');
const Lumina = require('../../structures/client/index');

module.exports = {
    name: "prefix",
         /**
     * 
     * @param {Lumina} client 
     * @param {Discord.Message} message
     * @param {string[]} args 
     */
    run: async(client, message, args) => {
        if (client.config.buyers.includes(message.authorId) || client.db.get(`owner_${message.authorId}`)){
           
            let newPrefix = args[0]
            if (!args[0]) return
            if (args[1]) return
            if (client.db.get(`prefix_${message.guild.id}`) === newPrefix) return message.channel.send(`Le prefix est déjà \`${client.db.get(`prefix_${message.guild.id}`)}\``)
            else {
                client.db.set(`prefix_${message.guild.id}`, args[0])
                message.channel.send(`Mon prefix est maintenant : \`${args[0]}\``)
            }
            }
        }
}
