module.exports = {
    name: "nowplaying",
    description: "Get info of the currently playing music",
    alias: ["np", "nowplay"],
    /**
     * @param {import("../classes/MusicClient")} client 
     * @param {import("discord.js").Message} message 
     */
    run: async (client, message) => {
        const serverQueue = client.queue.get(message.guild.id);
        if (!serverQueue) return message.reply("There is nothing playing.").catch(console.error);
        const song = serverQueue.songs[0]
        message.channel.send(`Now Playing: ${song.title} from ${song.channel}. Requested by <@${song.playUser}>`)
    }
}