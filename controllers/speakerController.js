const { Speaker, User } = require('../models');


exports.setupProfile = async (req, res) => {
  try {
    const { expertise, pricePerSession } = req.body;

    const speaker = await Speaker.create({
      expertise,
      pricePerSession,
      userId: req.userId,
    });

    res.status(201).json(speaker);
  } catch (error) {
    res.status(500).json({ message: 'Error setting up speaker profile.' });
  }
};


exports.getSpeakers = async (req, res) => {
  try {
    const speakers = await Speaker.findAll({
      include: [{
        model: User,
        attributes: ['firstName', 'lastName', 'email'],
      }],
    });

    res.status(200).json(speakers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching speakers.' });
  }
};