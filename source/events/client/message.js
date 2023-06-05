const { Client, Message } = require("devland.js");
const Lumina = require("../../structures/client/index");
const { Embed } = require("devland.js");
const fs = require("fs");
const ms = require("ms");
/**
 * @param {Client} client
 * @param {Message} message
 */
module.exports = {
  name: "message",
  run: async (client, message) => {
    if (!message.guild) return;
    let guildData;
    let startAt = Date.now();
    const guildName = message.guild.name;
    const channelName = message.channel.name;

    let prefix = await client.db.get(`prefix_${message.guild.id}`) === null? client.config.prefix:client.db.get(`prefix_${message.guild.id}`)
      
    if (!message.guild) return;

    if (
      message.content === `<@${client.user.id}>` ||
      message.content === `<@!${client.user.id}>`
    ) {
      
      return message.reply({ content: `Je suis en /commands \n J'ai aussi comme prefix : ${prefix} ` }).catch(() => {});
    }

    if (
      !message.content.startsWith(prefix) ||
      message.content === prefix ||
      message.content.startsWith(prefix + " ")
    ) {
      if (
        !message.content.startsWith(`<@${client.user.id}>`) &&
        !message.content.startsWith(`<@!${client.user.id}>`)
      ) {
        return;
      }
    }

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const commandName = args.shift()?.toLowerCase().normalize();

    if (!commandName) return;
    const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
    const [, matchedPrefix] = message.content.match(prefixRegex);
    const argss = message.content.slice(matchedPrefix.length).trim().split(/ +/);
    const comandName = argss.shift().toLowerCase();
    let command = client.commands.get(comandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(comandName));
    if (!command) return undefined

    const cmd =
      client.commands.get(commandName) || client.aliases.get(commandName);
    if (!cmd) return;

    cmd.run(client, message, args, prefix);
  },
};
