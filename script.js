/* ОБЩИЕ НАСТРОЙКИ */
:root {
    --primary: #FFB7C5; /* Цвет Сакуры */
    --secondary: #FF69B4; /* Насыщенный розовый */
    --bg-dark: #1a1a1a; /* Темный фон */
    --bg-panel: rgba(0, 0, 0, 0.75); /* Полупрозрачный черный */
    --text: #ffffff;
    --font-mc: 'Press Start 2P', cursive; /* Пиксельный шрифт */
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background-color: var(--bg-dark);
    font-family: var(--font-mc);
    color: var(--text);
    overflow: hidden; /* Чтобы не скроллилось во время загрузки */
    height: 100vh;
}

/* ФОН С САКУРОЙ */
.background-animation {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* Красивый японский фон */
    background: url('https://i.pinimg.com/originals/1c/1c/64/1c1c645d91cb61245032549d4432130c.gif') no-repeat center center fixed;
    background-size: cover;
    z-index: -2;
    filter: blur(3px); /* Размытие фона для красоты */
}

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5); /* Затемнение фона */
    z-index: -1;
}

/* ЭКРАН АНТИ-DDOS */
#ddos-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    transition: opacity 1s ease-out;
}

.ddos-container {
    text-align: center;
    width: 90%;
    max-width: 500px;
}

.shield-icon {
    font-size: 60px;
    margin-bottom: 20px;
    animation: pulse 2s infinite;
}

#ddos-text {
    font-size: 16px;
    margin-bottom: 20px;
    color: var(--primary);
    line-height: 1.5;
}

.loading-bar {
    width: 100%;
    height: 10px;
    background: #333;
    border: 2px solid #fff;
    margin-bottom: 15px;
    position: relative;
}

.progress {
    width: 0%;
    height: 100%;
    background: var(--primary);
    box-shadow: 0 0 10px var(--primary);
    animation: loadBar 4s forwards; /* 4 секунды анимация загрузки */
}

.sub-text {
    font-size: 10px;
    color: #888;
}

.console-text {
    margin-top: 20px;
    font-size: 10px;
    color: #0f0; /* Зеленый хакерский цвет */
    font-family: monospace;
    text-align: left;
}

/* АНИМАЦИИ */
@keyframes pulse {
    0% { transform: scale(1); text-shadow: 0 0 0px var(--primary); }
    50% { transform: scale(1.1); text-shadow: 0 0 20px var(--primary); }
    100% { transform: scale(1); text-shadow: 0 0 0px var(--primary); }
}

@keyframes loadBar {
    0% { width: 0%; }
    20% { width: 10%; }
    50% { width: 40%; }
    80% { width: 70%; }
    100% { width: 100%; }
}

/* ГЛАВНЫЙ САЙТ (Пока пустой стиль) */
#main-site {
    opacity: 0;
    transition: opacity 1s ease-in;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.hidden {
    display: none !important;
}

/* НАВИГАЦИЯ */
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background: rgba(0, 0, 0, 0.8);
    border-bottom: 2px solid var(--primary);
}

.logo {
    color: var(--primary);
    font-size: 20px;
    text-shadow: 2px 2px 0px #000;
}

.menu-items button {
    background: none;
    border: none;
    color: #fff;
    font-family: var(--font-mc);
    margin-left: 15px;
    cursor: pointer;
    font-size: 12px;
    padding: 10px;
    border: 2px solid transparent;
    transition: 0.3s;
}

.menu-items button:hover {
    color: var(--primary);
    border: 2px solid var(--primary);
    background: rgba(255, 183, 197, 0.1);
}

.active-btn {
    border-bottom: 2px solid var(--primary) !important;
}

/* МОБИЛЬНАЯ АДАПТАЦИЯ */
@media (max-width: 600px) {
    .navbar {
        flex-direction: column;
        gap: 15px;
    }
    .menu-items {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
}
