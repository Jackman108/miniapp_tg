window.Telegram.WebApp.ready();

const user = window.Telegram.WebApp.initDataUnsafe.user || {};
console.log('User Data:', user);
const { photo_url = '', is_premium = false, username = 'Имя пользователя' }  = user;

document.getElementById('username').innerText = username;
if (photo_url) {
    document.getElementById('avatar').src = photo_url;
} else {
    console.log('Photo URL is missing or empty'); // Логирование отсутствующего photo_url
}if (is_premium) {
    document.getElementById('premium-icon').style.display = 'inline';
} else {
    document.getElementById('premium-icon').style.display = 'none';
}

function inviteFriend() {
    const inviteLink = 'https://t.me/share/url?url=' + encodeURIComponent(window.location.href) + '&text=' + encodeURIComponent('Привет! Я использую мини-приложение и хотел бы, чтобы ты тоже присоединился. Нажми на ссылку, чтобы открыть приложение: ');
    window.Telegram.WebApp.openTelegramLink(inviteLink);
}
