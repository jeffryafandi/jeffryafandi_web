const TelegramBot = require('node-telegram-bot-api');

const token = '1249511986:AAHOFLw475kqwUciLA8mFr2nEo2SHJEFm3s';


const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/echo (.+)/, (msg, match) => {
  
  const chatId = msg.chat.id;
  const resp = match[1]; 
  
  bot.sendMessage(chatId, resp);
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'Received your message');
});
module.expots = bot;