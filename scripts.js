window.Telegram.WebApp.ready();

const user = window.Telegram.WebApp.initDataUnsafe.user || {};
const { username, photo_url, is_premium } = user;

console.log('User data:', user);

document.getElementById('username').innerText = username || 'Имя пользователя';
document.getElementById('avatar').src = photo_url || 'https://i.shgcdn.com/432a91c0-438c-4aea-9581-6015be274fe0/-/format/auto/-/preview/3000x3000/-/quality/lighter/';
document.getElementById('premium-icon').style.display = is_premium ? 'inline' : 'none';

function inviteFriend() {
    const text = 'Привет! Я использую мини-приложение и хотел бы, чтобы ты тоже присоединился. Нажми на ссылку, чтобы открыть приложение: ';
    const inviteLink = `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(text)}`;
    window.Telegram.WebApp.openTelegramLink(inviteLink);
}
