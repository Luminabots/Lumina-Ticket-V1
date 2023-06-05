const Discord = require("devland.js")
const { Client, Message } = require("devland.js");
const Lumina = require("../../structures/client/index");
const { Embed, Button } = require("devland.js");
const fs = require("fs");
const ms = require("ms");
/**
 * @param {Client} client
 * @param {Message} message
 */
module.exports = {
  name: "guildCreate",
  run: async (client, guild) => {
  
    if(client.db.get(`antijoinbot_${client.user.id}`) === null) {
        let invite = guild.fetchInvites()
        let join = new Embed()
        join.author = `Je viens de rejoindre ${guild.name}`
        join.fields = [{
            name: `Owner :`,
            value: `<@${guild.ownerId}>`
        }, {
            name: `Membres:`,
            value: `${guild.memberCount}`
        }]
        join.footer = client.config.footer
        join.color = client.config.default_color

        let button = new Button()
        button.style = 5
        button.url = invite
        let row = new Discord.ActionRow(button)
        const buyerUsers = client.users.filter(u => client.config.buyers.includes(u.id))

        const owner = client.users.filter(u => client.db.get(`owner_${client.user.id}_${u.id}`))
        buyerUsers.forEach(u => {
          u.send({ embeds: [join] , components: [row] })
        })
        owner.forEach(u => {
            u.send({ embeds: [join] , components: [row] })
        })
    }
    else if (client.db.get(`antijoinbot_${client.user.id}`) === true) {
        let invite = guild.fetchInvites()
        let join = new Embed()
        join.author = `Je viens de rejoindre ${guild.name}`
        join.fields = [{
            name: `Owner :`,
            value: `<@${guild.ownerId}>`
        }, {
            name: `Membres:`,
            value: `${guild.memberCount}`
        }]
        join.footer = client.config.footer
        join.color = client.config.default_color

        let button = new Button()
        button.style = 5
        button.url = invite
        let row = new Discord.ActionRow(button)
        const buyerUsers = client.users.filter(u => client.config.buyers.includes(u.id))

        let owner = client.users.filter(u => client.db.get(`owner_${client.user.id}_${u.id}`))
        buyerUsers.forEach(u => {
          u.send({ embeds: [join] , components: [row] })
        })
        owner.forEach(u => {
            u.send({ embeds: [join] , components: [row] })
        })

    }
  },
};
