window.Telegram.WebApp.ready();

const user = window.Telegram.WebApp.initDataUnsafe.user || {};

// Получаем данные пользователя из Telegram WebApp
const userName = user.first_name || 'Имя пользователя';
const userAvatar = user.photo_url || 'https://i.shgcdn.com/432a91c0-438c-4aea-9581-6015be274fe0/-/format/auto/-/preview/3000x3000/-/quality/lighter/';
const hasPremium = user.is_premium || false;

// Обновляем данные на странице
document.getElementById('username').innerText = userName;
document.getElementById('avatar').src = userAvatar;
if (hasPremium) {
    document.getElementById('premium-icon').style.display = 'inline';
} else {
    document.getElementById('premium-icon').style.display = 'none';
}

function inviteFriend() {
    const botUsername = 'EasyMiniAppBot';
    const inviteMessage = 'Привет! Я использую miniapp и хотел бы, чтобы ты тоже присоединился. Нажми на ссылку, чтобы открыть приложение: ' + window.location.href;

    const inviteQuery = `Привет! Я использую miniapp и хотел бы, чтобы ты тоже присоединился. Нажми на ссылку, чтобы открыть приложение: ${window.location.href}`;
    window.Telegram.WebApp.switchInlineQuery(inviteQuery);
}