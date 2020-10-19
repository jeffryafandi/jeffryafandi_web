const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '1185308557:AAGlk_M88dfgz-jwyrTf1LdBY1O-GnXdZXY';
const web = require("../models/web.js")
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

// Matches "/echo [whatever]"
bot.onText(/\/say /, (msg, match) => {

  const chatId = msg.chat.id
  const args = msg.text.slice("/".length).trim().split(/ +/g);
  bot.sendMessage(chatId, args.slice(1).join(" "));
})
bot.onText(/\/config/, async(msg, match) => {
const db = await web.findOne({id: "web"})
  const chatId = msg.chat.id
  const args = msg.text.slice("/".length).trim().split(/ +/g);
  if(!args[1]){
   
  const conten = `Configurasi web jeffryafandi\nId: ${db.id}\nBerita: ${db.berita}\nMaintenance: ${db.maintenance}`
  bot.sendMessage(chatId, conten);
  }
  if (args[1] === "berita") {
    await db.updateOne({ berita: args.slice(2).join(" ") })
    bot.sendMessage(chatId, `Berita Diganti Ke:\n${args.slice(2).join(" ")}`);
  } else if(args[1] === "maintenance"){
    if(args[2] === "false"){
      await db.updateOne({maintenance: false})
      bot.sendMessage(chatId, `Maintenance Diupdate Ke "false"`);
    }else if (args[2] === "true") {
      await db.updateOne({ maintenance: true })
      bot.sendMessage(chatId, `Maintenance Diupdate Ke "true"`);
    }else {
      bot.sendMessage(chatId, `Masukan \`false\` atau \`true\``);
    }
  }
})
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'Received your message')
})