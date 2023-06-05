const Discord = require('devland.js');
const Lumina = require('../../structures/client/index');

module.exports = {
    name: "uptime",
         /**
     * 
     * @param {Lumina} client 
     * @param {Discord.Message} message
     * @param {string[]} args 
     */
    run: async(client, message) => {
        let totalSeconds = (client.uptime / 1000);
        let jours = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let heures = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let secondes = Math.floor(totalSeconds % 60);
        const waitingEmbed = new Discord.Embed()
       waitingEmbed.fields = [{
        name: "Uptime",
        value: `${jours} jours, ${heures} heures, ${minutes} minutes et ${secondes} secondes`,
       }]
       waitingEmbed.color = client.config.default_color
       waitingEmbed.footer = client.config.footer

      message.channel.send(waitingEmbed)
    }
}
