<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WayO — Онлайн-билетирование</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <div class="logo">WayO</div>
        <nav>
            <div class="hamburger" id="hamburger">&#9776;</div>
            <ul id="nav-links">
                <li><a href="#home">Главная</a></li>
                <li><a href="#search">Поиск маршрутов</a></li>
                <li><a href="#about">О проекте</a></li>
                <li><a href="#contact">Контакты</a></li>
            </ul>
        </nav>
    </header>

    <section id="home" class="hero">
        <div class="slider">
            <img src="https://picsum.photos/id/1059/800/400" alt="Автобус">
            <img src="https://picsum.photos/id/1043/800/400" alt="Пассажиры">
            <img src="https://picsum.photos/id/1062/800/400" alt="Вокзал">
        </div>
        <div class="hero-text">
            <h1>WayO — Ваш билет онлайн</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis auctor, nisl at convallis.</p>
        </div>
    </section>

    <section id="search" class="search">
        <h2>Найдите свой маршрут</h2>
        <form>
            <input type="text" placeholder="Откуда">
            <input type="text" placeholder="Куда">
            <input type="date">
            <button type="button" onclick="alert('Функция демо')">Найти билеты</button>
        </form>
    </section>

    <section id="flights" class="flights">
        <h2>Список рейсов (демо)</h2>
        <div class="flight-cards">
            <div class="card" onclick="openModal('Город А → Город Б')">
                <img src="https://picsum.photos/id/1071/300/150" alt="Рейс 1">
                <h3>Город А → Город Б</h3>
                <p>Время: 10:00 – 14:00</p>
                <p>Цена: 3000 ₸</p>
                <button onclick="openModal('Город А → Город Б'); event.stopPropagation()">Выбрать место</button>
            </div>
            <div class="card" onclick="openModal('Город В → Город Г')">
                <img src="https://picsum.photos/id/1080/300/150" alt="Рейс 2">
                <h3>Город В → Город Г</h3>
                <p>Время: 12:00 – 16:30</p>
                <p>Цена: 3500 ₸</p>
                <button onclick="openModal('Город В → Город Г'); event.stopPropagation()">Выбрать место</button>
            </div>
            <div class="card" onclick="openModal('Город Д → Город Е')">
                <img src="https://picsum.photos/id/1084/300/150" alt="Рейс 3">
                <h3>Город Д → Город Е</h3>
                <p>Время: 09:30 – 13:30</p>
                <p>Цена: 2800 ₸</p>
                <button onclick="openModal('Город Д → Город Е'); event.stopPropagation()">Выбрать место</button>
            </div>
        </div>
    </section>

    <section id="payment" class="payment">
        <h2>Оплата билета (демо)</h2>
        <form>
            <input type="text" placeholder="Имя">
            <input type="email" placeholder="Email">
            <button type="button" onclick="alert('Функция демо')">Оплатить</button>
        </form>
    </section>

    <section id="about" class="about">
        <h2>О проекте</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed commodo, justo at ultricies elementum, felis sapien posuere orci, sit amet varius purus lorem vel erat. Mauris vehicula lorem ut nisl interdum, sed bibendum neque ultricies.</p>
        <p>Fusce efficitur, risus sit amet feugiat tincidunt, nulla metus scelerisque ex, at condimentum nibh lacus ut metus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </section>

    <footer id="contact">
        <p>Контакты: demo@wayo.kz | Телефон: +7 700 000 00 00</p>
        <p>© 2026 WayO</p>
    </footer>

    <!-- Модальное окно -->
    <div id="modal" class="modal">
        <div class="modal-content">
            <span class="close" onclick="closeModal()">&times;</span>
            <h3>Выбор места для рейса:</h3>
            <p id="modal-flight-name">Рейс</p>
            <div class="seats">
                <button>1A</button>
                <button>1B</button>
                <button>2A</button>
                <button>2B</button>
                <button>3A</button>
                <button>3B</button>
            </div>
        </div>
    </div>

    <script src="main.js"></script>
</body>
</html>
