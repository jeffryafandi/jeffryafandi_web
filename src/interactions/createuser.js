const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('createuser')
    .setDescription('[ADMIN] Create new game-hosting user')
    .addStringOption(option =>
      option.setName('email')
      .setDescription('Enter a valid email address!')
      .setRequired(true))
    .addStringOption(option =>
      option.setName('username')
      .setDescription('Enter a username!')
      .setRequired(true))
    .addStringOption(option =>
      option.setName('first_name')
      .setDescription('Enter account FistName!')
      .setRequired(true))
    .addStringOption(option =>
      option.setName('last_name')
      .setDescription('Enter account LastName!')
      .setRequired(true)),
  async execute(inter) {
    const config = require("../../config.json")
    if (config.env.owner_id.includes(inter.user.id) && inter.channel.parentId == "798373575945748500") {
      try {
        const email = inter.options.getString('email');
        const username = inter.options.getString('username');
        const first_name = inter.options.getString('first_name');
        const last_name = inter.options.getString('last_name');
        const Ractyl = require("ractyl").default;
        const ptero = new Ractyl(inter.client.config.panel, process.env.APIKEY);
        let a = await ptero.admin.users.create({email: email, first_name: first_name, last_name: last_name, username: username});
        if (a == true){
        let output = `\`\`\`js\nEmail: ${email}\nUsername: ${username}\n\nCheck your email inbox to set a password and activate the account :)\`\`\``
        await inter.reply({ content: `${output}panel: https://game.hosting.raznar.id/` })
        }else inter.reply({content: `\`\`\`js\nfalse\`\`\`` })
      } catch (e) {
        await inter.reply({ content: `\`\`\`js\n${e}\`\`\``, ephemeral: true })
      }
    } else return inter.reply({ content: "It's admin command & only can used in ticket channels", ephemeral: true });
  }
}