const Discord = require("devland.js");
const { Embed, ActionRow, StringSelect } = require("devland.js");
module.exports = {
  name: "help",
  aliases: ["h"],
  category: "info",
  description: "Shows all commands",
  usage: "help",
  run: async (client, message, args) => {
    const prefix =
      client.config.prefix || client.db.get(`prefix_${message.guild.id}`);
    let color = client.db.get(`color_${message.guild.id}`);
    if (color == null) color = client.config.default_color;
    const embed = new Embed();
    embed.title = "Ticket Bot By LuminaBots";
    embed.description = `Rejoignez le support du bot pour obtenir de l'aide si besoin.`;
    embed.color = color;
    embed.footer = client.config.footer;

    const select = new StringSelect();
    select.placeholder = "Veuillez sélectionner une catégorie";
    select.customId = "commandes-menu";
    select.options = [
      {
        label: "Infos",
        value: "infos",
      },
      {
        label: "Ticket",
        value: "ticket",
      },
      {
        label: "Owner",
        value: "owner",
      }
    ];

    const row = new ActionRow(select);

    let msg = await message.channel.send({
      embeds: [embed],
      components: [row],
    });

    const collector = msg.createComponentsCollector({
      filter: (m) => m.userId === message.authorId,
      time: 60000,
    });

    collector.on("collected", async (i) => {
      i.deferUpdate();
      if (i.customId === "commandes-menu") {
        if (i.values[0] === "infos") {
          const embed = new Embed();
          embed.title = `Commandes de la catégorie: ${i.values[0]}`;
          embed.description = `Rejoignez le support du bot pour obtenir de l'aide si besoin.`;
          embed.color = color;
          embed.fields = [
            {
              name: `> ${prefix}ping`,
              value: "Recupère la latence du bot",
            },
            {
              name: `> ${prefix}help`,
              value: "Affiche toutes les commandes",
            },
            {
              name: `> ${prefix}about`,
              value: "Affiche les informations du bot",
            },
            {
                name: `> ${prefix}luminabots`,
                value: "Envoie un lien d invite pour le support de luminabots"
            }
          ];
          embed.footer = client.config.footer;

          await msg.edit({ embeds: [embed], components: [row] });
        }
        if (i.values[0] === "ticket") {
          const embed = new Embed();
          embed.title = `Commandes de la catégorie: ${i.values[0]}`;
          embed.description = `Rejoignez le support du bot pour obtenir de l'aide si besoin.`;
          embed.color = color;
          embed.fields = [
            {
                name: `> ${prefix}ticket-conf`,
                value: "Permet de configurer le systeme ticket",
              }
          ];
          embed.footer = client.config.footer;
          await msg.edit({ embeds: [embed], components: [row] });
        } 
        if (i.values[0] === "owner") {
            const embed = new Embed();
            embed.title = `Commandes de la catégorie: ${i.values[0]}`;
            embed.description = `Rejoignez le support du bot pour obtenir de l'aide si besoin.`;
            embed.color = color;
            embed.fields = [
              {
                  name: `> ${prefix}setbot`,
                  value: "Permet de changer : nom du bot, avatar du bot",
                }, {
                    name : `> ${prefix}perms`,
                    value: "Permet de configurer le systeme de permissions"
                }, {
                    name: `> ${prefix}owner`,
                    value: "Permet d'avoir la liste des commandes owners"
                }
            ];
            embed.footer = client.config.footer;
            await msg.edit({ embeds: [embed], components: [row] });
        }
      }
    });
  },
};
