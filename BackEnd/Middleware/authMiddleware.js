const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  const parts = authHeader.split(' ');
  if (parts.length === 2 && parts[0] === 'Bearer') {
    const token = parts[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded.user;
      next();
    } catch (err) {
      console.error('Token verification error:', err);
      res.status(401).json({ msg: 'Token is not valid' });
    }
  } else {
    return res.status(401).json({ msg: 'Token format is incorrect' });
  }
};

module.exports = authMiddleware;