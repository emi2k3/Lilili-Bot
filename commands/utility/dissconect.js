const { getVoiceConnection } = require("@discordjs/voice");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dissconect")
    .setDescription("Dissconects from the call"),
  async execute(interaction) {
    const connection = getVoiceConnection("482639974869499914");
    connection.destroy();
    interaction.reply("Nos vimos wacho.");
  },
};
