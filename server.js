const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const path = require('path');
const fs = require('fs');
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
  bot.sendMessage(chatId, 'Привет! Нажмите кнопку ниже, чтобы открыть miniapp.', opts)
    .then(() => console.log('Message sent'))
    .catch((err) => console.error('Error sending message:', err)); // Логирование ошибки при отправке сообщения
});


// Отдача HTML страницы для мини-приложения
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Запуск сервера на порту из переменных окружения или 3000 по умолчанию
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
