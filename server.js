const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Підключення до бази даних MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Підключено до бази даних'))
    .catch((error) => console.error('Помилка підключення до бази даних:', error));

// Мідлвари
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущено на порту ${PORT}`);
});

app.use((req, res, next) => {
    console.log(`Запит: ${req.method} ${req.url}`);
    next();
});