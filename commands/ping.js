module.exports = {
    name: 'ping',
    aliases: ["pong"],
    description: 'Ping!',
    cooldown: 5,
    execute(message, args) {
        message.channel.send(`Pong! ${args}`);
    },
};
