const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '1249511986:AAHOFLw475kqwUciLA8mFr2nEo2SHJEFm3s';
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
  bot.sendMessage(chatId, `Berita: ${db.berita}\nMaintenance: ${db.maintenance}`);
})
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'Received your message')
})