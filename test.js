module.exports.run = async (client, msg, args) => {
  const a = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "@", "#", "$", "&"]

  const ba = Math.floor(Math.random() * a.length);
  const bb = Math.floor(Math.random() * a.length);
  const bc = Math.floor(Math.random() * a.length);
  const bd = Math.floor(Math.random() * a.length);
  const be = Math.floor(Math.random() * a.length);
  const bf = Math.floor(Math.random() * a.length);
  const bg = Math.floor(Math.random() * a.length);
  const bh = Math.floor(Math.random() * a.length);
  const bi = Math.floor(Math.random() * a.length);
  const bj = Math.floor(Math.random() * a.length);
  msg.channel.send(`\`${a[ba]}${a[bb]}${a[bc]}${a[bd]}${a[be]}${a[bf]}${a[bg]}${a[bh]}${a[bi]}${a[bj]}\``);
}
module.exports.help = {
  name: "pg",
  aliases: []
}