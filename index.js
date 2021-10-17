const Discord = require('discord.js');
const Intents = Discord.Intents.FLAGS;
const client = new Discord.Client({ intents: [ Intents.GUILDS, Intents.GUILD_MESSAGES ],  partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
let fs = require('fs');
const PREFIX = "YOUR_DISCORD_BOT_PREFIX";
const TOKEN = "YOUR_DISCORD_BOT_TOKEN";


client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles) {
  const command = require(`./commands/${file}`);

  client.commands.set(command.name, command);
}

client.on('messageCreate', async message => {
  if (message.content.startsWith(`PREFIX`)) {
    let file_name = `${message.content.split(' ')[0].replace(prefix, '')}.js`;
    if(!fs.existsSync('./commands/' + file_name)) return undefined;
    if(fs.existsSync('./commands/' + file_name)) {
      client.commands.get(file_name.replace('.js', '')).execute(client, message);
    }
  }
});

client.login(TOKEN);
