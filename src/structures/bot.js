const { Client } = require('discord.js');
const mdl = require("./module");
const ServerListener = require("../lib/webserver");
const KeepAlive = require("../lib/KeepAlive")
const { resolve } = require("path");

class bot extends Client {
  constructor(opt) {
    super(opt);
    this.keepAlive = new KeepAlive(this, 30);
    this.server = new ServerListener(process.env.PORT || 3000, resolve(__dirname, "../../src"));
    this.server.run();
    this.commands = mdl.commands;
    this.helps = mdl.helps;
    this.aliases = mdl.aliases;
    this.inter = mdl.inter
    this.config = require("../../config.json");
    this.nodeFetch = require("node-superfetch");
  }
}

module.exports = bot;