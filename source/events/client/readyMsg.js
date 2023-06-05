const Discord = require('devland.js');
const {Embed, ActionRow, Button} = require("devland.js")
const Lumina = require('../../structures/client/index');
module.exports = {
    name: "ready",
      /**
   * 
   * @param {Lumina} client 
   */
    run: async(client) => {
        const now = new Date();
        const timestamp = Math.floor(now.getTime() / 1000);
     

        let supp = new Button()
        supp.label = "Support",
        supp.style = 5,
        supp.url = client.config.support

        let row = new ActionRow(supp)
        let join = new Embed()
        join.description =  `<t:${timestamp}:R>\n >>> __Je viens de démarrer__`
        join.fields = [{
          name: "Support",
          value: `[Clique ici](https://discord.gg/luminabots)`
        }]
       join.footer = client.config.footer
       join.color = client.config.default_color
      

        const buyerUsers = client.users.filter(u => client.config.buyers.includes(u.id))

        buyerUsers.forEach(u => {
          u.send({ embeds: [join] , components: [row] })
        })

    }
}