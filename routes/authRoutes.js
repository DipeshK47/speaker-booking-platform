const express = require('express');
const { signup, login } = require('../controllers/authController');
const { bookSession } = require('../controllers/bookingController'); 
const { verifyToken } = require('../middlewares/authMiddleware'); 
const router = express.Router();

// Authentication routes
router.post('/signup', signup);
router.post('/login', login);

// Booking route
router.post('/book-session', verifyToken, bookSession); 

module.exports = router;