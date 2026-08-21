const User = require('../models/user.model');
const generateToken = require('../utils/generateToken');

const registerUser = async ({ name, email, password, role }) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        const error = new Error('Email already registered');
        error.status = 409;
        throw error;
    }

    const user = await User.create({ name, email, password, role });
    return {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
    };
};

const loginUser = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
        const error = new Error('Invalid email or password');
        error.status = 401;
        throw error;
    }

    return {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
    };
};

module.exports = {
    registerUser,
    loginUser
};
