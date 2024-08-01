const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const path = require('path');
require('dotenv').config();

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });
const app = express();

const indexPath = path.join(__dirname, 'index.html');

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const miniAppUrl = process.env.APP_URL;

  try {
    const user = await bot.getUserProfilePhotos(msg.from.id);
    const photoUrl = user.photos.length > 0
      ? `https://api.telegram.org/file/bot${token}/${(await bot.getFile(user.photos[0][0].file_id)).file_path}`
      : 'https://i.shgcdn.com/432a91c0-438c-4aea-9581-6015be274fe0/-/format/auto/-/preview/3000x3000/-/quality/lighter/';

    // Добавляем параметр к URL
    const urlWithParams = new URL(miniAppUrl);
    urlWithParams.searchParams.append('photo_url', encodeURIComponent(photoUrl));

    const opts = {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Открыть miniapp',
              web_app: { url: urlWithParams.toString() }
            }
          ]
        ]
      }
    };
    console.log(photoUrl);

    bot.sendMessage(chatId, 'Привет! Нажмите кнопку ниже, чтобы открыть miniapp.', opts);
  } catch (err) {
    console.error('Ошибка при получении фото профиля:', err);
    bot.sendMessage(chatId, 'Ошибка при получении фото профиля.');
  }
});

app.get('/', (req, res) => {
  res.sendFile(indexPath);
});

app.use(express.static(__dirname));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
