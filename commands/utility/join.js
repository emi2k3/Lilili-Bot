const { joinVoiceChannel, VoiceConnectionStatus, entersState } = require("@discordjs/voice");
const { ChannelType,SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
        .setName('join')
        .setDescription('Join the channel that the user is in')
        .addChannelOption((option) => 
            option
        .setName('channel') 
        .setDescription("the channel to join")
        .setRequired(true)
        .addChannelTypes(ChannelType.GuildVoice)    
    ),
    async execute(interaction) {
		const channel = interaction.options.getChannel('channel');
        voiceConnection = joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
        })
        interaction.reply("Ahí voy wacho")
	},
};