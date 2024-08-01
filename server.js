const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });
const app = express();

const indexPath = path.join(__dirname, 'index.html');

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
  bot.sendMessage(chatId, 'Привет! Нажмите кнопку ниже, чтобы открыть miniapp.', opts)
});

app.get('/', (req, res) => {
  res.sendFile(indexPath);
});

app.use(express.static(__dirname));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
