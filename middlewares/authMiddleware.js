const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; 

  if (!token) {
    return res.status(403).json({ message: 'No token provided.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('Token verification error:', err); 
      return res.status(401).json({ message: 'Failed to authenticate token.' });
    }

    req.userId = decoded.id;
    req.userType = decoded.userType;
    next();
  });
};

exports.isSpeaker = (req, res, next) => {
  if (req.userType !== 'speaker') {
    return res.status(403).json({ message: 'Require Speaker role.' });
  }
  next();
};