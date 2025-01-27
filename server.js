const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const User = require('./models/User'); // Підключення моделі користувача
require('dotenv').config();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

const app = express();
app.use(express.json());
app.use(cors());

// Підключення до бази даних
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('База даних підключена'))
    .catch(err => console.error('Помилка підключення до бази:', err));

// Маршрути
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// Відображення головної сторінки
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.use(express.static(path.join(__dirname, 'public')));

// Маршрут для особистої сторінки
// app.use(express.static(path.join(__dirname, 'public')));
app.get('/profile', async (req, res) => {
    try {
        // Отримання токена з заголовків
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Не авторизовано' });
        }

        // Перевірка токена
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: 'Користувача не знайдено' });
        }

        // Повернення HTML-сторінки
        res.sendFile(path.join(__dirname, 'public', 'profile.html'));
    } catch (err) {
        res.status(500).json({ message: 'Помилка сервера', error: err.message });
    }
});

// Логування запитів
app.use((req, res, next) => {
    console.log(`Запит: ${req.method} ${req.url}`);
    next();
});

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Сервер працює на порту ${PORT}`);
});

// const path = require('path');
// const express = require('express');
// const mongoose = require('mongoose');
// require('dotenv').config();

// const authRoutes = require('./routes/auth');
// const userRoutes = require('./routes/user');

// const app = express();
// app.use(express.json());

// // Підключення до бази даних
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('База даних підключена'))
//     .catch(err => console.error('Помилка підключення до бази:', err));

// // Маршрути
// app.use('/api/auth', authRoutes);
// app.use('/api/user', userRoutes);

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });
// app.use(express.static(path.join(__dirname, 'public')));

// // Запуск сервера
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Сервер працює на порту ${PORT}`);
// });
// const cors = require('cors');
// app.use(cors())

// app.use((req, res, next) => {
//     console.log(`Запит: ${req.method} ${req.url}`);
//     next();
// });