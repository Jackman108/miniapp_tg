window.Telegram.WebApp.ready();

const initData = window.Telegram.WebApp.initData || '';
const urlParams = new URLSearchParams(initData);

// Проверяем наличие данных о пользователе
const userData = JSON.parse(decodeURIComponent(urlParams.get('user') || '{}'));
const hasPhotoUrl = userData.photo_url;

console.log('Init Data:', initData);
console.log('User Data:', userData);
console.log('Has Photo URL:', hasPhotoUrl);

// Обновляем данные на странице
document.getElementById('username').innerText = userData.username || 'Имя пользователя';
document.getElementById('avatar').src = hasPhotoUrl ? userData.photo_url : 'https://i.shgcdn.com/432a91c0-438c-4aea-9581-6015be274fe0/-/format/auto/-/preview/3000x3000/-/quality/lighter/';
document.getElementById('premium-icon').style.display = userData.is_premium ? 'inline' : 'none';

function inviteFriend() {
    const text = 'Привет! Я использую мини-приложение и хотел бы, чтобы ты тоже присоединился. Нажми на ссылку, чтобы открыть приложение ';
    const inviteLink = `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(text)}`;
        window.Telegram.WebApp.openTelegramLink(inviteLink);
}