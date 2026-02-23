import dotenv from "dotenv"
dotenv.config()

import { Client, GatewayIntentBits } from "discord.js"

const client = new Client(
    [
        GatewayIntentBits.Guilds, //Para que pueda interactuar en el sv
        GatewayIntentBits.MessageContent, //Puede leer el contexto del servidor.
        GatewayIntentBits.GuildVoiceStates, // Para que pueda entrar por voz.
    ]
);

client.login(process.env.DISCORD_TOKEN);