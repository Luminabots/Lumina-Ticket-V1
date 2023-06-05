const Discord = require('devland.js');
const getNow = () => {
  return {
    time: new Date().toLocaleString("fr-FR", {
      timeZone: "Europe/Paris",
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    })
  };
};

const {ActivityType} = require("devland.js")
const Lumina = require('../../structures/client/index');
module.exports = {
    name: 'ready',
    /**
    *
    * @param {Lumina}
    */
   run: async(client) => {
    
    console.clear();
    console.log("-------------------------------");
    console.log(`[INVITE] : https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`)
    console.log(`[BOT]: ${client.user.username} est connecté à ${getNow().time}`);
    console.log(`[GUILDS]: ${client.guilds.size}`)
    console.log(`[SCRIPT]: Lumina est connecté au bot (${client.user.username})`)
    console.log("-------------------------------");
    client.guilds.map(guild => guild.setCommands(client.slashCommands.map(cmd => cmd.data)).catch(e => { 
      console.log(`Can't setup commands on ${guild.name}`)
   }))

   
    
   }
}