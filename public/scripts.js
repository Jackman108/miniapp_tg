window.Telegram.WebApp.ready();

const user = window.Telegram.WebApp.initDataUnsafe.user || {};
console.log('User Data:', user);
const { photo_url = '', is_premium = false, username = 'Имя пользователя' }  = user;
if (username) {
    document.getElementById('username').innerText = username;
    console.log('username Data:', username);
}
if (photo_url) {
    document.getElementById('avatar').src = photo_url;
    console.log('photo_url Data:', photo_url);
} else {
    console.log('Photo URL is missing or empty'); 
}if (is_premium) {
    document.getElementById('premium-icon').style.display = 'inline';
} else {
    document.getElementById('premium-icon').style.display = 'none';
}

function inviteFriend() {
    const baseURL = window.location.href.split('?')[0]; 
    const inviteText = 'Привет! Я использую мини-приложение и хотел бы, чтобы ты тоже присоединился. Нажми на ссылку, чтобы открыть приложение: ';
    const inviteLink = 'https://t.me/share/url?url=' + encodeURIComponent(baseURL) + '&text=' + encodeURIComponent(inviteText);
    window.Telegram.WebApp.openTelegramLink(inviteLink);
}
