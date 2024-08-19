const express = require('express');
const { setupProfile, getSpeakers } = require('../controllers/speakerController');
const { verifyToken, isSpeaker } = require('../middlewares/authMiddleware');

const router = express.Router();

// Protected route for setting up speaker profile
router.post('/setup', verifyToken, isSpeaker, setupProfile);

// Public route to get the list of speakers
router.get('/list', getSpeakers);

module.exports = router;