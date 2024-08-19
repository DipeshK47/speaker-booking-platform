const { Booking, Speaker, User } = require('../models');
const { sendEmail } = require('../utils/emailService');
const { createEvent } = require('../utils/calendarService');

exports.bookSession = async (req, res) => {
  try {
    const { speakerId, date, timeSlot } = req.body;

    // Check if the time slot is already booked
    const existingBooking = await Booking.findOne({
      where: { speakerId, date, timeSlot },a
    });

    if (existingBooking) {
      return res.status(400).json({ message: 'Time slot already booked.' });
    }

    const booking = await Booking.create({
      userId: req.userId,
      speakerId,
      date,
      timeSlot,
    });

    // Get user and speaker details
    const user = await User.findByPk(req.userId);
    const speaker = await Speaker.findByPk(speakerId, {
      include: [{ model: User, attributes: ['email', 'firstName', 'lastName'] }],
    });

    // Send email notifications
    await sendEmail(user.email, 'Session Booking Confirmation', `You have successfully booked a session with ${speaker.User.firstName} ${speaker.User.lastName} on ${date} at ${timeSlot}.`);
    await sendEmail(speaker.User.email, 'New Session Booking', `${user.firstName} ${user.lastName} has booked a session with you on ${date} at ${timeSlot}.`);

    // Create Google Calendar event
    const startTime = new Date(`${date}T${timeSlot}:00`);
    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000); 
    await createEvent(
      `Session with ${speaker.User.firstName} ${speaker.User.lastName}`,
      `You have a session booked with ${speaker.User.firstName} ${speaker.User.lastName}.`,
      startTime.toISOString(),
      endTime.toISOString(),
      [user.email, speaker.User.email]
    );

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error booking session.' });
  }
};