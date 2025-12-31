/**
 * SAMURAI SMP ENGINE v3.0
 * Logic, Particles, Monitoring, Security
 */

class SamuraiApp {
    constructor() {
        this.serverIp = "c12.play2go.cloud";
        this.serverPort = "20002";
        this.lang = "ru";
        this.particlesEnabled = true;
        
        // База данных игроков (Админ панель)
        this.topPlayers = [
            { rank: 1, name: "ws3eqr", kdr: "15.4", country: "🇷🇺 RU" },
            { rank: 2, name: "Samurai_One", kdr: "12.1", country: "🇯🇵 JP" },
            { rank: 3, name: "Ninja_Pro", kdr: "9.8", country: "🇺🇦 UA" },
            { rank: 4, name: "CraftMaster", kdr: "8.5", country: "🇺🇸 US" },
            { rank: 5, name: "AlexSteve", kdr: "7.2", country: "🇩🇪 DE" },
            { rank: 6, name: "DragonSlayer", kdr: "6.9", country: "🇨🇳 CN" },
            { rank: 7, name: "BuilderBob", kdr: "5.0", country: "🇬🇧 UK" }
        ];

        // Словарь переводов
        this.translations = {
            ru: {
                menu_home: "Главная", menu_top: "Топ Игроков", menu_support: "Поддержка", menu_settings: "Настройки",
                hero_title: "ДОЛИНА СЁГУНА", hero_desc: "Погрузись в уникальный мир с атмосферой древней Японии, магией Сакуры и честным выживанием.",
                btn_play: "НАЧАТЬ ИГРУ", ip_hint: "Нажми, чтобы скопировать IP адрес",
                feat_1_title: "Без Вайпов", feat_1_desc: "Мы ценим твои постройки. Долгие сезоны и защита регионов.",
                feat_2_title: "Экономика", feat_2_desc: "Торгуй с игроками, создавай магазины и стань самым богатым.",
                feat_3_title: "Комьюнити", feat_3_desc: "Адекватные игроки, частые ивенты и отзывчивая администрация.",
                col_name: "НИКНЕЙМ", col_stats: "K/D СТАТИСТИКА", col_country: "СТРАНА"
            },
            en: {
                menu_home: "Home", menu_top: "Top Players", menu_support: "Support", menu_settings: "Settings",
                hero_title: "SHOGUN VALLEY", hero_desc: "Immerse yourself in a unique world with ancient Japan atmosphere, Sakura magic and fair survival.",
                btn_play: "START PLAYING", ip_hint: "Click to copy Server IP",
                feat_1_title: "No Wipes", feat_1_desc: "We value your builds. Long seasons and region protection.",
                feat_2_title: "Economy", feat_2_desc: "Trade with players, create shops and become the richest samurai.",
                feat_3_title: "Community", feat_3_desc: "Friendly players, frequent events and responsive administration.",
                col_name: "NICKNAME", col_stats: "K/D RATIO", col_country: "COUNTRY"
            }
        };

        this.init();
    }

    // --- 1. ИНИЦИАЛИЗАЦИЯ ---
    init() {
        this.runLoader();
        this.initParticles();
        this.renderTop();
    }

    // --- 2. ЭКРАН ЗАГРУЗКИ (Anti-DDoS Fake) ---
    runLoader() {
        const logs = [
            "Initializing secure connection...",
            "Resolving DNS: c12.play2go.cloud...",
            "Handshake verified.",
            "Checking browser integrity...",
            "Loading assets: Sakura_Engine...",
            "Samurai Guard: ACCESS GRANTED."
        ];
        
        let i = 0;
        const logBox = document.getElementById('console-logs');
        const bar = document.getElementById('progress-bar');
        
        const interval = setInterval(() => {
            if (i < logs.length) {
                const p = document.createElement('div');
                p.innerText = `> ${logs[i]}`;
                logBox.appendChild(p);
                logBox.scrollTop = logBox.scrollHeight;
                
                // Прогресс бар
                const percent = ((i + 1) / logs.length) * 100;
                bar.style.width = `${percent}%`;
                
                i++;
            } else {
                clearInterval(interval);
                setTimeout(() => {
                    this.finishLoading();
                }, 800);
            }
        }, 600);
    }

    finishLoading() {
        const loader = document.getElementById('loader');
        const app = document.getElementById('app');
        
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            app.style.display = 'grid';
            setTimeout(() => app.style.opacity = '1', 50);
            this.startMonitoring(); // Запускаем проверку онлайна
        }, 800);
    }

    // --- 3. ЧАСТИЦЫ САКУРЫ (Canvas) ---
    initParticles() {
        const canvas = document.createElement('canvas');
        canvas.id = "sakura-canvas";
        document.getElementById('particles-js').appendChild(canvas);
        const ctx = canvas.getContext('2d');
        
        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const particles = [];
        const particleCount = 60; // Количество лепестков

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height - height;
                this.size = Math.random() * 5 + 3;
                this.speedY = Math.random() * 1 + 0.5;
                this.speedX = Math.random() * 1 - 0.5;
                this.rotation = Math.random() * 360;
                this.rotationSpeed = Math.random() * 2 - 1;
                this.opacity = Math.random() * 0.5 + 0.3;
            }
            update() {
                this.y += this.speedY;
                this.x += this.speedX;
                this.rotation += this.rotationSpeed;
                if (this.y > height) {
                    this.y = -10;
                    this.x = Math.random() * width;
                }
            }
            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.rotation * Math.PI / 180);
                ctx.fillStyle = `rgba(255, 183, 197, ${this.opacity})`;
                ctx.beginPath();
                // Рисуем лепесток
                ctx.ellipse(0, 0, this.size, this.size / 2, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        }

        for (let i = 0; i < particleCount; i++) particles.push(new Particle());

        const animate = () => {
            if (!this.particlesEnabled) {
                ctx.clearRect(0, 0, width, height);
                return;
            }
            ctx.clearRect(0, 0, width, height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animate);
        };
        animate();

        window.addEventListener('resize', () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        });
    }

    // --- 4. ЛОГИКА ВКЛАДОК ---
    switchTab(tabName) {
        // Скрываем все секции
        document.querySelectorAll('.tab-section').forEach(el => el.classList.remove('active'));
        // Убираем активность кнопок
        document.querySelectorAll('.nav-btn').forEach(el => el.classList.remove('active'));
        
        // Показываем нужное
        document.getElementById(`tab-${tabName}`).classList.add('active');
        
        // Находим кнопку и подсвечиваем (поиск по onclick)
        const btns = document.querySelectorAll('.nav-btn');
        btns.forEach(btn => {
            if(btn.getAttribute('onclick').includes(tabName)) btn.classList.add('active');
        });
    }

    // --- 5. МОНИТОРИНГ СЕРВЕРА ---
    async startMonitoring() {
        const badge = document.getElementById('status-badge');
        const current = document.getElementById('online-count');
        const max = document.getElementById('max-count');

        try {
            const response = await fetch(`https://api.mcsrvstat.us/3/${this.serverIp}:${this.serverPort}`);
            const data = await response.json();

            if (data.online) {
                badge.innerText = "● ONLINE";
                badge.style.color = "#00ff00";
                badge.style.background = "rgba(0,255,0,0.1)";
                current.innerText = data.players.online;
                max.innerText = data.players.max;
            } else {
                badge.innerText = "● OFFLINE";
                badge.style.color = "red";
                badge.style.background = "rgba(255,0,0,0.1)";
            }
        } catch (e) {
            console.error("API Error");
            badge.innerText = "● ERROR";
        }
    }

    // --- 6. ТОП ИГРОКОВ (Рендер) ---
    renderTop() {
        const tbody = document.getElementById('top-list-body');
        tbody.innerHTML = "";
        
        this.topPlayers.forEach(p => {
            let rankClass = p.rank <= 3 ? `rank-${p.rank}` : "";
            tbody.innerHTML += `
                <tr class="${rankClass}">
                    <td><div class="rank-badge">#${p.rank}</div></td>
                    <td style="color:#fff; font-weight:600;">${p.name}</td>
                    <td style="color:var(--sakura);">${p.kdr}</td>
                    <td>${p.country}</td>
                </tr>
            `;
        });
    }

    // --- 7. УТИЛИТЫ ---
    copyIp() {
        navigator.clipboard.writeText(`${this.serverIp}:${this.serverPort}`);
        alert("IP адрес скопирован! Ждем тебя на сервере.");
    }

    sendSupport() {
        const name = document.getElementById('sup-name').value;
        if (name.length < 3) return alert("Введите ваш ник!");
        
        // Троллинг
        alert("Самураи не спят, но сейчас у них перерыв на чай 🍵\nПопробуйте позже!");
        this.switchTab('home');
    }

    toggleLang() {
        this.lang = this.lang === 'ru' ? 'en' : 'ru';
        document.getElementById('lang-btn').innerText = this.lang.toUpperCase();
        
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (this.translations[this.lang][key]) {
                el.innerText = this.translations[this.lang][key];
            }
        });
    }

    toggleParticles(checkbox) {
        this.particlesEnabled = checkbox.checked;
    }
}

// ЗАПУСК ПРИЛОЖЕНИЯ
const app = new SamuraiApp();
