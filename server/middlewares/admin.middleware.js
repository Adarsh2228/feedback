const jwt = require('jsonwebtoken');

const isAdmin = (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'You are not authorized to access this route' });
    }
    next();
  } catch (error) {
    res.status(403).json({ message: 'Authorization error' });
  }
};

module.exports = isAdmin;
