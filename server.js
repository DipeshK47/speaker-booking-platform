const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/db');
const bookSessionRouter = require('./routes/book-session');
const authRoutes = require('./routes/authRoutes');
const speakerRoutes = require('./routes/speakerRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const { verifyToken, isSpeaker } = require('./middlewares/authMiddleware');

dotenv.config();

const app = express();

app.use(express.json());
app.use('/api', bookSessionRouter);
app.use('/api/auth', authRoutes); 
app.use('/api/speakers', speakerRoutes);
app.use('/api/bookings', bookingRoutes);

// Connect to the database
sequelize.sync().then(() => {
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
  });
}).catch(err => console.log('Error: ' + err));
