const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Реєстрація
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Перевірка існування користувача
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Користувач уже існує' });
        }

        // Хешування пароля
        const hashedPassword = await bcrypt.hash(password, 10);

        // Створення користувача
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'Реєстрація успішна' });
    } catch (err) {
        res.status(500).json({ message: 'Помилка сервера', error: err.message });
    }
});

// Вхід
router.post('/login', async (req, res) => {
    console.log('Запит на вхід:', req.body);
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            console.log('Користувача не знайдено');
            return res.status(404).json({ message: 'Користувача не знайдено' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log('Неправильний пароль');
            return res.status(401).json({ message: 'Неправильний пароль' });
        }

        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '10d' });
        console.log('Успішний вхід, токен:', token);
        res.json({ message: 'Успішний вхід', token });
    } catch (error) {
        console.error('Помилка сервера:', err);
        res.status(500).json({ message: 'Помилка сервера', error });
    }
});

module.exports = router;