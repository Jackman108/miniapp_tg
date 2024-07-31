const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const app = express();

const token = '';
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const opts = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Открыть miniapp',
            url: 'https://GITHUB_PAGES_URL'
          }
        ]
      ]
    }
  };
  bot.sendMessage(chatId, 'Привет! Нажмите кнопку ниже, чтобы открыть miniapp.', opts);
});

app.get('/', (req, res) => {
  res.send('Бот работает!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
