module.exports.run = async (client, msg, args) => {
  const ch = args[0].slice(2, -1)
  if (client.channels.resolve(ch)) {
    if (msg.content.toLowerCase().includes('--reply')) {
      try {
        let a = client.channels.resolve(ch).messages.fetch(msg.content.split(" ").slice(args.length - 1)).then(a => a.reply(args.join(" ").slice(args.length - 1)))
      } catch (err) {
        return undefined;
      }
    }
    msg.delete()
        client.channels.resolve(ch).send(args.slice(1).join(" "))

  } else {
    if (args.slice(args.length -2, -1).includes('--reply')) {
      try {
        let a = client.channels.resolve(ch).messages.fetch(msg.content.split(" ").slice(args.length - 1)).then(a => a.reply(args.join(" ").slice(args.length - 1)))
      } catch (err) {
        return undefined;
      }
    } else {
      msg.channel.send(args.join(" "))
    msg.delete()
    }
  }
}
module.exports.help = {
  name: "say",
  aliases: []
}