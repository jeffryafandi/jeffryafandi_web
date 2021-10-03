module.exports = async (client, msg) =>{

  const pref = client.config.prefix
  
  const PREFIX = msg.content.toLowerCase().startsWith(pref) ? pref: `${client.user.toString()}`
  const args = msg.content.slice(PREFIX.length).trim().split(/ +/g)
  const command = args.shift()
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  }
  if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (!cmd) return undefined;
   if(!client.config.env.owner_id.includes(msg.author.id) && cmd.help.module.hide === true) return undefined
   if(!client.config.env.staff_id.includes(msg.author.id) && cmd.help.module.staff === true) return undefined
  
  cmd.run(client, msg, args)
}