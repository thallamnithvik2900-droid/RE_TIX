const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            const error = new Error('Access denied');
            error.status = 403;
            return next(error);
        }
        next();
    };
};

module.exports = authorizeRoles;
