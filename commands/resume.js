module.exports = {
    name: "resume",
    description: "Resume currently playing music",
    alias: ["rsm"],
    /**
     * @param {import("../classes/MusicClient")} client 
     * @param {import("discord.js").Message} message 
     * @param {string[]} args 
     */
    run: async (client, message, args) => {
        const serverQueue = client.queue.get(message.guild.id);

        if (!message.member.voice.channel) return message.reply("You need to join a voice channel first!").catch(console.error);

        const { channel } = message.member.voice;

        if(channel.id !== serverQueue.channel.id) return message.reply("You need join same voice channel with me!")
        if (serverQueue && !serverQueue.playing) {
            serverQueue.playing = true;
            serverQueue.connection.dispatcher.resume();
            return serverQueue.textChannel.send(`${message.author} ▶ resumed the music!`).catch(console.error);
        }
        return message.reply("There is nothing playing.").catch(console.error);
    }
}