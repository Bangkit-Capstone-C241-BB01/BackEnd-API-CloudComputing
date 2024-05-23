const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (data) => {
  const token = jwt.sign(data, process.env.JWT_SECRET_KEY, {
    expiresIn: '7d',
  });
  return token;
};

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  
  if (token == null) return res.status(401).json({ msg: 'There is no token, please authenticate' });

  return jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ msg: 'Token expired' });
        } else if (err.name === 'JsonWebTokenError') {
          return res.status(401).json({ msg: 'Invalid token' });
        } else {
          return res.status(500).json({ msg: 'Internal server error' });
        }
      }

    req.user = user;
    next();
  });
};

module.exports = {
    generateToken,
    authenticateToken
}