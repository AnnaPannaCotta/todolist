const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticate = (req, res, next) => {
    console.log(`Перевірка токена для ${req.method} ${req.url}`);
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        console.log(' Токен відсутній');
        return res.status(401).json({ message: 'Немає токена' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // req.user = { id: decoded.id };
        console.log(' Токен дійсний:', decoded);

        req.user = decoded;
        next();
    } catch (err) {
        console.error(' Недійсний токен:', err);
        return res.status(401).json({ message: 'Недійсний токен' });
    }
};

module.exports = authenticate;