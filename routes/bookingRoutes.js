const express = require('express');
const { bookSession } = require('../controllers/bookingController');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

// Protected route to book a session
router.post('/book', verifyToken, bookSession);

module.exports = router;