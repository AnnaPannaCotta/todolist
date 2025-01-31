# todolist
Орієнтовна структура проекту: 
1ша сторінка - кнопка з входом, реєстрацією, можливо nav меню займе всю сторінку, футер з вкладками: про проект, як це працює, додаткові тарифи, (почитати, як зробити вхід через гугл)
2га сторінка - сторінка ділиться на 2 частини - одна робоча частина, в якій будуть списком відображатись завдання, в другій частині буде 

Запасни варінт server.js:
// const path = require('path');
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const jwt = require('jsonwebtoken');
// const User = require('./models/User'); // Підключення моделі користувача
// require('dotenv').config();

// const authRoutes = require('./routes/auth');
// const userRoutes = require('./routes/user');

// const app = express();
// app.use(express.json());
// // app.use(cors());

// // Підключення до бази даних
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('База даних підключена'))
//     .catch(err => console.error('Помилка підключення до бази:', err));

// // Маршрути
// app.use('/api/auth', authRoutes);
// app.use('/api/user', userRoutes);

// // Відображення головної сторінки
// app.get('/dashbord', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });
// app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//     console.log(`Запит: ${req.method} ${req.url}`);
//     console.log('Заголовки:', req.headers);
//     next();
// });

// // Маршрут для особистої сторінки



// // Логування запитів
// app.get('/profile', async (req, res) => {
//     console.log('Запит на /profile отримано');
//     const token = req.headers.authorization?.split(' ')[1];
//     console.log('Отриманий токен:', token);

//     if (!token) {
//         console.log('Токен відсутній');
//         return res.status(401).json({ message: 'Не авторизований профіль' });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         console.log('Декодований токен:', decoded);

//         const user = await User.findById(decoded.id);
//         if (!user) {
//             console.log('Користувача не знайдено');
//             return res.status(404).json({ message: 'Користувача не знайдено' });
//         }

//         console.log('Користувач знайдений:', user.username);
//         res.sendFile(path.join(__dirname, 'public', 'profile.html'));
//     } catch (err) {
//         console.error('Помилка при перевірці токена:', err);
//         res.status(500).json({ message: 'Помилка сервера', error: err.message });
//     }
// });

// app.use((req, res, next) => {
//     console.log(`Запит: ${req.method} ${req.url}`);
//     next();
// });

// // Запуск сервера
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Сервер працює на порту ${PORT}`);
// });
// console.log('JWT_SECRET:', process.env.JWT_SECRET);

// app.get('/profile', async (req, res) => {
//     try {
//         // Отримання токена з заголовків
//         const token = req.headers.authorization?.split(' ')[1];
//         if (!token) {
//             return res.status(401).json({ message: 'Не авторизований профіль' });
//         }

//         // Перевірка токена
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const user = await User.findById(decoded.id);
//         if (!user) {
//             return res.status(404).json({ message: 'Користувача не знайдено' });
//         }

//         // Повернення HTML-сторінки
//         res.sendFile(path.join(__dirname, 'public', 'profile.html'));
//     } catch (err) {
//         res.status(500).json({ message: 'Помилка сервера', error: err.message });
//     }
// });

Запасний варіант завантаження профілю:

// async function loadProfile() {
//     const token = localStorage.getItem('token');
//     if (!token) {
//         alert('Ви не авторизовані! Перенаправлення...');
//         window.location.href = '/';
//         return;
//     }

//     const response = await fetch('/api/user/profile', { 
//         method: 'GET',
//         headers: { 'Authorization': `Bearer ${token}` }
//     });

//     if (!response.ok) {
//         alert('Помилка авторизації! Перезайдіть у систему.');
//         localStorage.removeItem('token');
//         window.location.href = '/';
//         return;
//     }

//     const userData = await response.json();
//     document.getElementById('username').textContent = userData.username;
// }

// window.onload = loadProfile; 

// async function loadUserProfile() {
//     const token = localStorage.getItem('token');

//     if (!token) {
//         alert('Ви не авторизовані!');
//         window.location.href = '/index.html';
//         return;
//     }

//     try {
//         const response = await fetch('/api/user/profile', { 
//             method: 'GET',
//             headers: { Authorization: `Bearer ${token}` } // Тут передається токен
//         });

//         if (!response.ok) {
//             throw new Error('Помилка авторизації');
//         }

//         const data = await response.json();
//         document.getElementById('username').textContent = data.username;
//     } catch (error) {
//         console.error('Помилка завантаження профілю:', error);
//         alert('Токен недійсний!');
//         window.location.href = '/index.html';
//     }
// }

// function logout() {
//     localStorage.removeItem('token');
//     window.location.href = '/';
// }

// window.onload = loadUserProfile;