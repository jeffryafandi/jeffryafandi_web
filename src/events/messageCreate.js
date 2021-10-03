const { DiscordAPIError, MessageEmbed } = require("discord.js");
const discord = require("discord.js");

module.exports = async (client, msg) => {

  if (!msg.guild || msg.author.bot) return;

  if (msg.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`)))
    return msg.reply(`**Hello, my prefix is:** \`${client.config.prefix}\``);
  if (
    msg.content.toLowerCase().startsWith(client.config.prefix) ||
    msg.content.startsWith(`${client.user.toString()}`) || msg.content.startsWith(`${client.user.toString()} `)
  )
    return require("../structures/command")(client, msg);
  if (!client.application?.owner) await client.application?.fetch();
}