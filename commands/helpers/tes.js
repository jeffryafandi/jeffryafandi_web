const FiveM = require("fivem")
const srv = new FiveM.Server('sg-game2.raznar.host:10003')
const dc = require("discord.js")
    try {
      const playersOnline = await srv.getPlayers()
      const maxPlayers = await srv.getMaxPlayers()
      const server = await srv.getServer()
      const status = await srv.getServerStatus()
      const name = await srv.getGamename()
      const embed = new dc.MessageEmbed()
        .setColor("GREEN")
        .setAuthor("Server Status")
        .setDescription(`\`\`\`py\nServer Name: ${name}\nOnline: ${status.online}\nVersion: ${server.version}\nPlayers: (${playersOnline}/${maxPlayers})\n\`\`\``)
        .setTimestamp();
      msg.channel.send({embeds: [embed]});
    }
    catch (err) {
      const embed = new dc.MessageEmbed()
        .setColor("RED")
        .setAuthor("Server is offline")
        .setTimestamp();
      msg.channel.send({embeds: [embed]});
    }


const Discord = require("discord.js");
const FiveM = require("fivem")
const srv = new FiveM.Server('202.83.121.200:5050')
 
    srv.getPlayers().then((data) => {
      let result  = [];
      let index = 1;
      for (let player of data) {
        result.push(`${index++}. ${player.name} | ${player.id} ID | ${player.ping} ping\n`);
      }
      const playersOnline = await srv.getPlayers()
      const embed = new Discord.MessageEmbed()
        .setColor("BLUE")
        .setAuthor("Server is online")
        .setTitle(`Players (${data.length}/${playersOnline})`)
        .setDescription(result.length > 0 ? result : 'No Players Online!')
        .setTimestamp();
      message.channel.send(embed);
    }).catch((err) => {
      const embed = new Discord.MessageEmbed()
      .setColor("RED")
      .setAuthor("Server is offline")
      .setTimestamp();
    message.channel.send(embed);
    });
