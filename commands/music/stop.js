const embeds = require("../internal/embeds.js");
const { loc } = require("../internal/localizer.js")

exports.run = async function(client, message, args, guildConf) {
    const l = guildConf.language;
    const guild = message.guild;
    const voiceChan = message.member.voice.channel;
    const chan = message.channel;
    if (!voiceChan) chan.send(embeds.simpleEmbed(loc("err.err",l),loc("music.nochan",l), guildConf.colors.failure));
    else if (voiceChan.id != guildConf.musicChannel) chan.send(embeds.simpleEmbed(loc("err.err",l),loc("music.otherchan",l), guildConf.colors.failure));
    else {
        guildConf.queue = [];
        guildConf.playing = false;
        client.settings.set(guild.id, guildConf);
        await chan.send(embeds.simpleEmbed(loc("music.stop",l),loc("music.stopVerbose",l,[message.author.id]), guildConf.colors.primary));
    }
}
module.exports.help = {
    perms: ["MUSIC"],
    args:[]
};