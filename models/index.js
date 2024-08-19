const User = require('./User');
const Speaker = require('./Speaker');
const Booking = require('./Booking');

User.hasOne(Speaker, { foreignKey: 'userId' });
Speaker.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Booking, { foreignKey: 'userId' });
Booking.belongsTo(User, { foreignKey: 'userId' });

Speaker.hasMany(Booking, { foreignKey: 'speakerId' });
Booking.belongsTo(Speaker, { foreignKey: 'speakerId' });

module.exports = { User, Speaker, Booking };