const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });
const app = express();

// Публикация статических файлов из папки 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Отдача данных о подписчиках
app.get('/subscribers', (req, res) => {
  fs.readFile('subscribers.json', (err, data) => {
    if (err) {
      res.status(500).send('Ошибка чтения данных о подписчиках');
      return;
    }
    try {
      const subscribers = JSON.parse(data);
      res.json(subscribers);
    } catch (jsonErr) {
      res.status(500).send('Ошибка обработки данных о подписчиках');
    }
  });
});

// Обработка команды /start для бота
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

// Обработка команды /invite для бота
bot.onText(/\/invite/, (msg) => {
  const chatId = msg.chat.id;
  const inviteMessage = 'Привет! Я использую мини-приложение и хотел бы, чтобы ты тоже присоединился. Нажми на ссылку, чтобы открыть приложение: ' + process.env.APP_URL;

  bot.sendMessage(chatId, inviteMessage);
});

// Обработка команды /start с параметром приглашения
bot.onText(/\/start (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const inviteMessage = match[1]; // Получаем сообщение приглашения

  bot.sendMessage(chatId, inviteMessage);
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
