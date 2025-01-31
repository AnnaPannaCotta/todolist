const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authenticate = require('../middleware/authenticate'); 
const router = express.Router();

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



