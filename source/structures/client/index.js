const {Client, Store} = require('devland.js')
const fs = require('fs')
module.exports = class Lumina extends Client {
    constructor(options = {
       intents: 32767, 
       guildsLifeTime: 7200000,
       channelsLifeTime: 7200000,
       usersLifeTime: 7200000,
       membersLifeTime: 7200000,
       messagesLifeTime: 7200000,
       threadsLifeTime: 7200000,
       rolesLifeTime: 7200000,
       invitesLifeTime: 7200000,
       presenceLifeTime: 7200000,
       voicesLifeTime: 7200000,
       waitCacheBeforeReady: true,
       status: "dnd",
       presence: {
        activities: [{name: 'Lumina Ticket v1.0', type: 1, url: "https://twitch.tv/tsubasa_t3h"}],
       }
    }) {
        super(options)
        this.setMaxListeners(0)
        this.commands = new Store()
        this.aliases = new Store()
        this.slashCommands = new Store()
        this.config = require('../../../config/config')
        this.creators = require('../../../config/creators')
        this.version = require('../../../config/version')
        this.functions = require('../utils')
        this.ms = require('../utils/ms')
        this.pretty = require('pretty-ms')
        this.db = require("quick.db")
        this.initCommands()
        this.initSlashCommands()
        this.initEvents()
        this.connectToToken()
    }

    async connectToToken(){
        this.connect(this.config.token)
    }
    refreshConfig() {
        delete this.config;
        delete require.cache[require.resolve('../../../config/config')];
        this.config = require('../../../config/config');
    }
    initCommands() {
        const subFolders = fs.readdirSync('./source/commands');
        for (const category of subFolders) {
            const commandsFiles = fs.readdirSync(`./source/commands/${category}`).filter(file => file.endsWith('.js'));
            for (const commandFile of commandsFiles) {
                const command = require(`../../commands/${category}/${commandFile}`);
                command.category = category
                command.commandFile = commandFile
                if (command.name === "bl" && this.config.isPublic) continue;
                if (command.name === "unbl" && this.config.isPublic) continue;
                if (command.name === "leavesettings") continue;
                if (command.category === 'gestion' && this.config.isPublic) continue;
                this.commands.set(command.name, command);
                if (command.aliases && command.aliases.length > 0) {
                    command.aliases.forEach(alias => this.aliases.set(alias, command));
                }
            }
        }
        let finale = new Store();
        this.commands.map(cmd => {
            if (finale.has(cmd.name)) return;
            finale.set(cmd.name, cmd);
            this.commands.filter(v => v.name.startsWith(cmd.name) || v.name.endsWith(cmd.name)).map(cm => finale.set(cm.name, cm));
        })
        this.commands = finale;
    }

    initEvents() {
        const subFolders = fs.readdirSync(`./source/events`)
        for (const category of subFolders) {
            const eventsFiles = fs.readdirSync(`./source/events/${category}`).filter(file => file.endsWith(".js"))
            for (const eventFile of eventsFiles) {
                const event = require(`../../events/${category}/${eventFile}`)
                this.on(event.name, (...args) => event.run(this, ...args))
                if (category === 'anticrash') process.on(event.name, (...args) => event.run(this, ...args))
            }
        }
    }
      

    initSlashCommands() {
        const subFolders = fs.readdirSync(`./source/slashCmds`)
        for (const category of subFolders) {
            const commandsFiles = fs.readdirSync(`./source/slashCmds/${category}`).filter(file => file.endsWith('.js'))
            for (const commandFile of commandsFiles) {
                const command = require(`../../slashCmds/${category}/${commandFile}`)
                command.category = category
                command.commandFile = commandFile
                this.slashCommands.set(command.data.name, command)
            }
        }
    }
}