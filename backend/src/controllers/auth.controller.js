const authService = require('../services/auth.service');

const register = async (req, res) => {
    const { name, email, password, role } = req.body;
    const user = await authService.registerUser({ name, email, password, role });
    res.status(201).json(user);
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await authService.loginUser({ email, password });
    res.json(user);
};

module.exports = {
    register,
    login
};
