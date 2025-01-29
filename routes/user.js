const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Middleware для перевірки токена
const authenticate = (req, res, next) => {
    console.log('Заголовки запиту:', req.headers);
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Немає токена' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded.id) {
            return res.status(401).json({ message: 'Недійсний токен' });
        }
        req.user = { id: decoded.id };
        next();
    } catch (err) {
        res.status(401).json({ message: 'Недійсний токен' });
    }
};

// Персональна сторінка користувача
router.get('/profile', authenticate, async (req, res) => {
    try {
        console.log('Отриманий `req.user`: ', req.user);
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'Користувач не знайдений' });
        }
        res.status(200).json({ username: user.username, data: user.data });
    } catch (err) {
        res.status(500).json({ message: 'Помилка сервера', error: err.message });
    }
});

module.exports = router;
//21.31 змінила назву в router.get на profile з me
