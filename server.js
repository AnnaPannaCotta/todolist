const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const User = require('./models/User');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const authenticate = require('./middleware/authenticate'); 

const app = express();

app.use(express.json());
app.use(cors());

// Підключення до бази MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('База даних підключена'))
    .catch(err => console.error('Помилка підключення до бази:', err));

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// Middleware для перевірки токена
// const authenticate = (req, res, next) => {
//     console.log(`🔍 Перевірка токена для ${req.method} ${req.url}`);
//     const token = req.headers.authorization?.split(' ')[1];

//     if (!token) {
//         console.log(' Токен відсутній');
//         return res.status(401).json({ message: 'Немає токена' });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = { id: decoded.id };
//         console.log(' Токен дійсний:', decoded);
//         next();
//     } catch (err) {
//         console.error(' Недійсний токен:', err);
//         return res.status(401).json({ message: 'Недійсний токен' });
//     }
// };

//  Статичні файли
app.use(express.static(path.join(__dirname, 'public')));

//  Головна сторінка
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Віддача сторінки профілю (НЕ вимагає авторизації)
app.get('/profile', (req, res) => {
    console.log('🔵 Запит на profile.html');
    res.sendFile(path.join(__dirname, 'public', 'profile.html'));
});

// API: Отримати дані профілю (вимагає авторизації)
app.get('/api/user/profile', authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            console.log('❌ Користувач не знайдений');
            return res.status(404).json({ message: 'Користувача не знайдено' });
        }

        console.log('✅ Повертаємо профіль:', user.username);
        res.status(200).json({ username: user.username, email: user.email });
    } catch (err) {
        console.error('❌ Помилка сервера:', err);
        res.status(500).json({ message: 'Помилка сервера' });
    }
});

// Додаткове логування
app.use((req, res, next) => {
    console.log(`📢 Запит: ${req.method} ${req.url}`);
    next();
});

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Сервер працює на порту ${PORT}`));

console.log('🔑 JWT_SECRET:', process.env.JWT_SECRET);

