const TelegramBot = require('node-telegram-bot-api');

const token = '1249511986:AAHOFLw475kqwUciLA8mFr2nEo2SHJEFm3s';


const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/createdb (.+)/, (msg, match) => {
  const mongoose = require("mongoose")
  const chatId = msg.chat.id;
  const resp = match[1]; 
  const newPlayer = new Player({
    _id: mongoose.Types.ObjectId(),
    id: "web",
    maintenance: false,
    berita: "Halooo"
  
  
  });
  
  newPlayer
    .save()
    .then(result => console.log(result))
    .catch(err => console.error(err));
  bot.sendMessage(chatId, `Created db with name ${resp}`);
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'Received your message');
});
module.expots = bot;