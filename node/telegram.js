const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '1249511986:AAHOFLw475kqwUciLA8mFr2nEo2SHJEFm3s';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

// Matches "/echo [whatever]"
bot.onText(/\/say /, (msg, match) => {

  const chatId = msg.chat.id;
  const resp = match[1];
  const args = msg.text.slice("/".length).trim().split(/ +/g);
  bot.sendMessage(chatId, args[1]);
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, 'Received your message');
});