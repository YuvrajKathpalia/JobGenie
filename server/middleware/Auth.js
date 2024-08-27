const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to verify JWT token
const verifyToken = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.user.id).select('-password');
    if (!req.user) return res.status(404).json({ msg: 'User not found' });
    next();
  } catch (err) {
    console.error(err.message);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};


const isEmployer = (req, res, next) => {
  try {
    if (req.user.role !== 'employer') {
      return res.status(403).json({ msg: 'Access denied' });
    }
    next(); // Proceed to next middleware or the original api
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


const verifyAdmin = (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied' });
    }
    next(); 
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = { verifyToken, verifyAdmin, isEmployer };
