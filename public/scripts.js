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

// Загрузка и отображение списка подписчиков
fetch('/subscribers')
    .then(response => response.json())
    .then(subscribers => {
        const subscribersList = document.getElementById('subscribers-list');
        subscribersList.innerHTML = '<h3>Подписчики:</h3>';

        subscribers.forEach(subscriber => {
            const subscriberDiv = document.createElement('div');
            subscriberDiv.className = 'subscriber';

            const avatar = document.createElement('img');
            avatar.src = subscriber.avatar;
            avatar.alt = `${subscriber.name}'s avatar`;
            avatar.className = 'subscriber-avatar';

            const name = document.createElement('p');
            name.innerText = subscriber.name;

            subscriberDiv.appendChild(avatar);
            subscriberDiv.appendChild(name);

            subscribersList.appendChild(subscriberDiv);
        });
    })
    .catch(error => console.error('Ошибка при загрузке подписчиков:', error));

function inviteFriend() {
    window.Telegram.WebApp.openTelegramLink('https://t.me/share/url?url=' + encodeURIComponent(window.location.href));
}
