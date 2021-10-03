const { MessageEmbed } = require("discord.js");

module.exports = async (client, inter) => {
  if (inter.isCommand()) {
    if (!client.inter.has(inter.commandName)) return;
    try {
      await client.inter.get(inter.commandName).execute(inter);
    } catch (error) {
      console.error(error);
      await inter.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
  } else if (inter.isButton()) {
    if (inter.customId === 'test' && client.config.env.owner_id.includes(inter.user.id)) {
      
      inter.reply("you clicked the test button")
      
    } else inter.reply({ content: "You dont have the permission to run this command", ephemeral: true })
  } else if (inter.isSelectMenu()) {

  } else return;
}