const Discord = require('devland.js');
const Lumina = require('../../structures/client/index');

module.exports = {
    name: "ping",
         /**
     * 
     * @param {Lumina} client 
     * @param {Discord.Message} message
     * @param {string[]} args 
     */
    run: async(client, message) => {
       const waitingEmbed = new Discord.Embed()
       waitingEmbed.description = 'Latence du bot: \n' + client.ws.ping + 'MS'
       waitingEmbed.color = client.config.default_color
       waitingEmbed.footer = client.config.footer

      message.channel.send(waitingEmbed)
    }
}
