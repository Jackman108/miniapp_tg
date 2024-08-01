window.Telegram.WebApp.ready();

// Получаем данные пользователя из Telegram WebApp
const urlParams = new URLSearchParams(window.location.search);
const usernameFromUrl = urlParams.get('username');

const user = window.Telegram.WebApp.initDataUnsafe.user || {};
const { photo_url, is_premium } = user;

// Обновляем данные на странице
document.getElementById('username').innerText = usernameFromUrl || user.username;
document.getElementById('avatar').src = photo_url || 'https://i.shgcdn.com/432a91c0-438c-4aea-9581-6015be274fe0/-/format/auto/-/preview/3000x3000/-/quality/lighter/';
if (is_premium) {
    document.getElementById('premium-icon').style.display = 'inline';
} else {
    document.getElementById('premium-icon').style.display = 'none';
}

function inviteFriend() {
    const inviteLink = 'https://t.me/EasyMiniAppBot/menu' + 'Привет! Я использую мини-приложение и хотел бы, чтобы ты тоже присоединился. Нажми на ссылку, чтобы открыть приложение';
    window.Telegram.WebApp.openTelegramLink(inviteLink);
}