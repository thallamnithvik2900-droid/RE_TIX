const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        const error = new Error('Not authorized, token missing');
        error.status = 401;
        return next(error);
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 're-tix-secret');
        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            const error = new Error('User not found');
            error.status = 401;
            return next(error);
        }
        req.user = user;
        next();
    } catch (err) {
        const error = new Error('Token is invalid');
        error.status = 401;
        next(error);
    }
};

module.exports = protect;
