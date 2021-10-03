module.exports.run = async (client, msg, args) => {
  let start = Date.now();

  msg.channel
    .send("Pong!")
    .then((m) => {
      let end = Date.now();
      m.edit(`HTTP API(Edit Msg): ${end - start} ms\nGateway: ${Math.round(client.ws.ping)} ms`).catch((e) => msg.channel.send(e));
    });
}
module.exports.help = {
  name: "ping",
  aliases: []
}