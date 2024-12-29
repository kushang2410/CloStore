const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const parts = authHeader.split(' ');
        if (parts.length === 2 && parts[0] === 'Bearer') {
            const token = parts[1];

            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    return res.status(403).json({ msg: 'Invalid token' });
                }

                req.user = { id: decoded.id };
                next();
            });
        } else {
            res.status(401).json({ msg: 'Token format is incorrect' });
        }
    } else {
        res.status(401).json({ msg: 'No token provided' });
    }
};

module.exports = { authenticateJWT };