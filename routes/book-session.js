const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Speaker = require('../models/Speaker');
const { verifyToken, isSpeaker } = require('../middlewares/authMiddleware');

router.post('/book-session', verifyToken, async (req, res) => {
    const { speakerId, date, timeSlot } = req.body;
    const userId = req.userId;

    try {
        // Check if the time slot is already booked
        const existingBooking = await Booking.findOne({
            where: {
                speaker_id: speakerId,
                date: date,
                time_slot: timeSlot
            }
        });

        if (existingBooking) {
            return res.status(400).json({ message: 'Time slot already booked. Please choose another slot.' });
        }

        // Proceed with booking
        const newBooking = await Booking.create({
            user_id: userId,
            speaker_id: speakerId,
            date: date,
            time_slot: timeSlot
        });


        res.status(201).json({ message: 'Session booked successfully', booking: newBooking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
