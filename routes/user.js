const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authenticate = require('../middleware/authenticate'); 
const router = express.Router();

// Персональна сторінка користувача
router.get('/profile', authenticate, async (req, res) => {
    try {
        res.json({ message: "Профіль користувача", user: req.user });
      } catch (err) {
        res.status(500).json({ message: "Помилка сервера" });
      }
    });
    
module.exports = router;



