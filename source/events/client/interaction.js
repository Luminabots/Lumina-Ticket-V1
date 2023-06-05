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
  name: "interaction",
  run: async (client, interaction) => {
    if(!interaction.isSlashCommand) return;
    let command = client.slashCommands.get(interaction.commandName);
    if(!command) return;
    command.run(client, interaction)
  },
};
