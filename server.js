const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const path = require('path');
require('dotenv').config();

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
    const miniAppUrl = process.env.APP_URL;
 
  const opts = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Открыть miniapp',
            web_app: { url: miniAppUrl }
          }
        ]
      ]
    }
  };
  bot.sendMessage(chatId, 'Привет! Нажмите кнопку ниже, чтобы открыть miniapp.', opts);
});

bot.onText(/\/invite/, (msg) => {
  const chatId = msg.chat.id;
  const inviteMessage = 'Привет! Я использую miniapp и хотел бы, чтобы ты тоже присоединился. Нажми на ссылку, чтобы открыть приложение: ' + process.env.APP_URL;

  bot.sendMessage(chatId, inviteMessage);
});


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
