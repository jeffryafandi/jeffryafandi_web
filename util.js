const snek = require("node-superfetch");
const nodeVersion = parseInt(process.versions.node.split("."), 10);

class Util {
  static randomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  static async db(){
    const player = require("./models/web.js");
    return await player.findOne({id: "web"})
  }
  static async hastebin(text) {
    const { body } = await snek
      .post("https://hasteb.in/documents")

      .send(text);
    return `https://hasteb.in/${body.key}`;
  }
}

module.exports = Util;
