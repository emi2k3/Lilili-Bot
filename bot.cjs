const dotenv = require("dotenv");
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, REST, Routes} = require('discord.js');


dotenv.config()

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds, //Para que pueda interactuar en el sv
        GatewayIntentBits.MessageContent, //Puede leer el contexto del servidor.
        GatewayIntentBits.GuildVoiceStates, // Para que pueda entrar por voz.
    ]
}
   
);

client.commands =new Collection();
// Comandos
const commands = [];
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);	
		console.log(command);
		client.commands.set(command.data.name, command);
		commands.push(command.data.toJSON()); 
	}
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(process.env.DISCORD_TOKEN);

// Carga los comandos
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// Edita para poner los comandos nuevos
		const data = await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.SERVER_ID), { body: commands });

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		
		console.error(error);
	}
})();

//Eventos Iteraciones
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter((file) => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}


client.login(process.env.DISCORD_TOKEN);