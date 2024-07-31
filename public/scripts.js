window.Telegram.WebApp.ready();

// Получаем данные пользователя из Telegram WebApp
const user =window.Telegram.WebApp.initDataUnsafe.user || {};
const { photo_url, is_premium, username } = user;

// Обновляем данные на странице
document.getElementById('username').innerText = username;
document.getElementById('avatar').src = photo_url || '';
if (is_premium) {
    document.getElementById('premium-icon').style.display = 'inline';
} else {
    document.getElementById('premium-icon').style.display = 'none';
}


function inviteFriend() {
    const inviteLink = 'https://t.me/share/url?url=' + encodeURIComponent(window.location.href) + '&text=' + ('Привет! Я использую мини-приложение и хотел бы, чтобы ты тоже присоединился. Нажми на ссылку, чтобы открыть приложение: ');
    window.Telegram.WebApp.openTelegramLink(inviteLink);
}
