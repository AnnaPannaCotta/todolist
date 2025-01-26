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
    try {
        const { username, password } = req.body;

        // Знайти користувача
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Неправильний логін або пароль' });
        }

        // Перевірка пароля
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Неправильний логін або пароль' });
        }

        // Генерація JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Вхід успішний', token });
    } catch (err) {
        res.status(500).json({ message: 'Помилка сервера', error: err.message });
    }
});

module.exports = router;