const Discord = require('devland.js');
const Lumina = require('../../structures/client/index');

module.exports = {
    name: "setpic",
         /**
     * 
     * @param {Lumina} client 
     * @param {Discord.Message} message
     * @param {string[]} args 
     */
    run: async(client, message, args) => {
      if (client.config.buyers.includes(message.authorId) || client.db.get(`owner_${message.authorId}`)){
           
            if (message.attachments.size > 0) {
                message.attachments.forEach((attachment) => {
                  client.user
                    .setAvatar(attachment.url)
                    .then((u) =>
                      message.reply(`J'ai bien changer de photo de profil`)
                    )
                    .catch((e) => {
                      return message.channel.send(
                        `Je ne peux pas changer de phote de profil pour l'instant, veuillez réessayer plus tard`
                      );
                    });
                });
            } else {
                let str_content = args.slice(0).join(" ");
        if (!str_content) return;
        client.user
          .setAvatar(str_content)
          .then((u) => message.reply("L'avatar du bot a été mis à jour"))
          .catch((e) => {
            return message.channel.send(
              `Je ne peux pas changer d'avatar pour le moment`
            );
          });
            }
        }
    }
}
