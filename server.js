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

bot.onText(/\/getphoto/, (msg) => {
  const chatId = msg.chat.id;

  bot.getUserProfilePhotos(msg.from.id).then((res) => {
      if (res.photos.length > 0) {
          const fileId = res.photos[0][0].file_id;
          bot.getFile(fileId).then((result) => {
              const filePath = result.file_path;
              const photoUrl = `https://api.telegram.org/file/bot${token}/${filePath}`;
              bot.sendMessage(chatId, photoUrl);
          });
      } else {
          bot.sendMessage(chatId, 'У вас нет фото профиля.');
      }
  }).catch(err => {
      bot.sendMessage(chatId, 'Ошибка при получении фото профиля.');
      console.error(err);
  });
});

app.get('/', (req, res) => {
  res.sendFile(indexPath);
});

app.use(express.static(__dirname));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
