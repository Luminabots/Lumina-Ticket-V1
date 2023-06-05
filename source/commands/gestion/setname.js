const Discord = require('devland.js');
const Lumina = require('../../structures/client/index');

module.exports = {
    name: "setname",
         /**
     * 
     * @param {Lumina} client 
     * @param {Discord.Message} message
     * @param {string[]} args 
     */
    run: async(client, message, args) => {
      if (client.config.buyers.includes(message.authorId) || client.db.get(`owner_${message.authorId}`)){
           
         
                let str_content = args.slice(0).join(" ");
        if (!str_content) return;
        client.user.setName(str_content)
        .then((u) =>
        message.reply(`J'ai bien changer de nom`))
        .catch((e) => {
            return message.channel.send(
              `Je ne peux pas changer de nom d'utilisateur pour l'instant, veuillez réessayer plus tard`
            );
          });
            }
        }
}
