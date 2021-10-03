const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('payment')
    .setDescription('Shows the list of available payment methods'),
  async execute(inter) {
    const { MessageEmbed } = require("discord.js");
    const embed = new MessageEmbed()
      .setAuthor("Payment/Pembayaran", inter.client.user.displayAvatarURL())
      .setDescription(`**TELKOMSEL**: 0812-1105-1287 (+30%)\n**GoPay/Dana/Ovo**: 0813-1842-8882\n**BCA (Virtual Acc)**: 70001081318428882\n**Paypal**: xabhista19@gmail.com\n**Note**: (+4.4%) + ($0.3) for every Paypal transaction (G&S Tax).\nHowever you can use F&F to pay without paypal fee.\n**QRIS (IDR 2K Tax)**:`)
      .setColor(inter.client.config.embed.color)
      .setImage("https://media.discordapp.net/attachments/790947513678561300/814368056989450270/20210225_101811.jpg")
      .setFooter(`Extra (+10%) fee every transaction!!`, inter.client.user.displayAvatarURL())
    await inter.reply({ embeds: [embed], ephemeral: true });
  },
}; 