// --- 1. АНТИ-DDOS ЗАГРУЗКА ---
document.addEventListener("DOMContentLoaded", () => {
    const logs = ["Connecting...", "Checking handshake...", "Verifying Samurai Spirit...", "Access Granted."];
    let i = 0;
    const interval = setInterval(() => {
        if (i < logs.length) {
            document.getElementById('console-log').innerText = logs[i];
            document.querySelector('.progress').style.width = ((i + 1) * 25) + "%";
            i++;
        } else {
            clearInterval(interval);
            setTimeout(() => {
                document.getElementById('ddos-screen').style.opacity = '0';
                setTimeout(() => {
                    document.getElementById('ddos-screen').style.display = 'none';
                    document.getElementById('main-site').classList.remove('hidden');
                    setTimeout(() => document.getElementById('main-site').style.opacity = '1', 50);
                    updateServerStatus(); // Запуск мониторинга
                }, 1000);
            }, 500);
        }
    }, 800);
    renderTop(); // Запуск таблицы топа
});

// --- 2. МОНИТОРИНГ ---
function updateServerStatus() {
    fetch('https://api.mcsrvstat.us/3/c12.play2go.cloud:20002')
        .then(r => r.json())
        .then(data => {
            if (data.online) {
                document.getElementById('server-status-text').innerText = "ONLINE";
                document.getElementById('server-status-text').style.color = "#00AA00";
                document.getElementById('status-dot').innerText = "🟢";
                document.getElementById('player-count').innerText = data.players.online;
                document.getElementById('max-players').innerText = data.players.max;
            } else {
                document.getElementById('server-status-text').innerText = "OFFLINE";
                document.getElementById('server-status-text').style.color = "red";
            }
        });
}

// --- 3. ВКЛАДКИ ---
function switchTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.add('hidden'));
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active-tab'));
    document.querySelectorAll('.menu-items button').forEach(b => b.classList.remove('active-btn'));
    
    document.getElementById('tab-' + tabName).classList.remove('hidden');
    document.getElementById('tab-' + tabName).classList.add('active-tab');
    document.getElementById('btn-' + tabName).classList.add('active-btn');
}

// --- 4. КОПИРОВАНИЕ IP ---
function copyIp() {
    navigator.clipboard.writeText("c12.play2go.cloud:20002");
    const t = document.getElementById('copy-tooltip');
    t.style.opacity = '1';
    setTimeout(() => t.style.opacity = '0', 2000);
}

// --- 5. ТОП ИГРОКОВ (МЕНЯЙ ТУТ) ---
const topPlayers = [
    { rank: 1, name: "ws3eqr", country: "🇷🇺 RU" },
    { rank: 2, name: "Samurai_01", country: "🇯🇵 JP" },
    { rank: 3, name: "Ninja_Pro", country: "🇺🇦 UA" },
    { rank: 4, name: "Steve", country: "🇺🇸 US" },
    { rank: 5, name: "Alex", country: "🇩🇪 DE" }
];

function renderTop() {
    const tbody = document.getElementById('top-list-body');
    tbody.innerHTML = "";
    topPlayers.forEach(p => {
        let rankClass = p.rank <= 3 ? `rank-${p.rank}` : "";
        let icon = p.rank === 1 ? "🥇" : p.rank === 2 ? "🥈" : p.rank === 3 ? "🥉" : `#${p.rank}`;
        tbody.innerHTML += `<tr><td class="${rankClass}">${icon}</td><td style="color:var(--primary)">${p.name}</td><td>${p.country}</td></tr>`;
    });
}

// --- 6. ПОДДЕРЖКА ---
function sendSupport() {
    const nick = document.getElementById('sup-nick').value;
    if (!nick) return alert("Введите ник!");
    alert(translations[currentLang].alert_sleep);
    switchTab('home');
}

// --- 7. ПЕРЕВОД ---
const translations = {
    ru: {
        menu_home: "Главная", menu_top: "Топ Лист", menu_support: "Поддержка",
        desc: "Эпическое выживание в стиле Сакуры 🌸",
        top_title: "🏆 ЛУЧШИЕ ВОИНЫ", top_desc: "Список обновляется Сёгуном", col_nick: "Никнейм", col_country: "Страна",
        sup_title: "🆘 ПОДДЕРЖКА", sup_nick: "Ваш ник:", sup_mail: "Ваша почта:", sup_msg: "Описание:", btn_send: "ОТПРАВИТЬ",
        set_title: "⚙️ НАСТРОЙКИ", set_lang: "Язык / Language", set_anim: "Анимации фона",
        alert_sleep: "Поддержка спит! 😴\nВас сегодня никто не поддержит."
    },
    en: {
        menu_home: "Home", menu_top: "Top List", menu_support: "Support",
        desc: "Epic survival in Sakura World 🌸",
        top_title: "🏆 TOP WARRIORS", top_desc: "Updated by Shogun", col_nick: "Name", col_country: "Country",
        sup_title: "🆘 SUPPORT", sup_nick: "Nickname:", sup_mail: "Email:", sup_msg: "Issue:", btn_send: "SEND",
        set_title: "⚙️ SETTINGS", set_lang: "Language", set_anim: "Background Anim",
        alert_sleep: "Support is sleeping! 😴\nNobody will help you today."
    }
};
let currentLang = 'ru';

function toggleLang() {
    currentLang = currentLang === 'ru' ? 'en' : 'ru';
    document.getElementById('lang-btn').innerText = currentLang.toUpperCase();
    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        if (translations[currentLang][key]) el.innerText = translations[currentLang][key];
    });
}
