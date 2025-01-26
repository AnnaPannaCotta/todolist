const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

const app = express();
app.use(express.json());

// Підключення до бази даних
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('База даних підключена'))
    .catch(err => console.error('Помилка підключення до бази:', err));

// Маршрути
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.use(express.static(path.join(__dirname, 'public')));

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Сервер працює на порту ${PORT}`);
});
const cors = require('cors');
app.use(cors())

app.use((req, res, next) => {
    console.log(`Запит: ${req.method} ${req.url}`);
    next();
});