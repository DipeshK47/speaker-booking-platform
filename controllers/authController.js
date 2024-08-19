const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const dotenv = require('dotenv');

dotenv.config();
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// User Signup
exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, userType } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      userType
    });

    // Respond with user creation success
    res.status(201).json({ message: 'User created successfully.' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user.', error: error.message });
  }
};

// User Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, userType: user.userType }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Error logging in.', error: error.message });
  }
};

// Email Verification (remove this function as it is no longer needed)
// exports.verifyEmail = async (req, res) => {
//   try {
//     const { token } = req.query;
//     const user = await User.findOne({ where: { verificationToken: token } });
    
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid or expired token.' });
//     }

//     user.verified = true;
//     user.verificationToken = null;
//     await user.save();

//     res.status(200).json({ message: 'Email verified successfully.' });
//   } catch (error) {
//     console.error('Error verifying email:', error);
//     res.status(500).json({ message: 'Error verifying email.', error: error.message });
//   }
// };