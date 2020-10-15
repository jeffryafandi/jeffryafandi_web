/*const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '1249511986:AAHOFLw475kqwUciLA8mFr2nEo2SHJEFm3s';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

// Matches "/echo [whatever]"
const util = require("../util.js");
util.db().then(async (db) => {
bot.onText(/\/maintenance (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
if(!match){
  bot.sendMessage(chatId, `maintenance: ${db.maintenance}`)
}else

  const resp = match[1]; // the captured "whatever"
 if (resp = "true") await db.updateOne({maintenance: true})
 else await db.updateOne({maintenance: false})
  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, 'Received your message');
});
})*/