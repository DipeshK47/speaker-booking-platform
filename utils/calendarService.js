const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const { OAuth2 } = google.auth;

const oAuth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

oAuth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

exports.createEvent = async (summary, description, startTime, endTime, attendees) => {
  try {
    const event = {
      summary,
      description,
      start: {
        dateTime: startTime,
        timeZone: 'Asia/Kolkata',
      },
      end: {
        dateTime: endTime,
        timeZone: 'Asia/Kolkata',
      },
      attendees: attendees.map(email => ({ email })),
    };

    const response = await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
    });

    return response.data;
  } catch (error) {
    console.error('Error creating Google Calendar event:', error);
  }
};