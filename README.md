# Speaker Booking Platform - Backend

## Task Overview

This platform enables users to book speaker sessions from available speaker listings. Users can browse through speakers, view their availability, and book sessions. The backend implementation includes functionalities for user and speaker profiles, session bookings, time slot management, and notifications.

## Features

1. **User and Speaker Profiles:**
   - **Signup Functionality:**
     - Users and speakers can create profiles with basic details (first name, last name, email, password).
     - OTP (One-Time Password) verification is required for account activation.
   - **Login Authentication:**
     - Users and speakers can log in using their credentials.
     - Authentication tokens are generated upon successful login.
     - Middleware ensures endpoint access based on user roles.

2. **Speaker Listing and Expertise:**
   - **Speaker Profile Setup (Protected Route):**
     - Speakers can list their profiles, including expertise and session price.
     - Access to this route is restricted to authenticated speakers.

3. **Session Booking:**
   - **Speaker Profile Listing:**
     - Users can view a list of speakers.
     - Booking requires user authentication.
     - Time slots are available for booking from 9 AM to 4 PM, in 1-hour intervals.

4. **Time Slot Blocking:**
   - **Blocked Slots (Protected Route):**
     - Time slots are blocked once a session is booked to prevent double bookings.

5. **Email Notifications and Calendar Events:**
   - **Email Notification (Protected Route):**
     - Email notifications are sent to both the speaker and user upon successful booking.
   - **Google Calendar Invite (Protected Route):**
     - A Google Calendar event is created and sent to both parties for session reminders.

## Development Guidelines

1. **Technology Stack:**
   - Node.js with Express.js for backend development.
   - JavaScript for API endpoints and business logic.
   - SQL database for data storage and management.

2. **Documentation:**
   - Postman used for API documentation.
   - Included endpoint descriptions, request parameters, response formats, and authentication requirements.
   - Provided clear explanations for each endpoint.

## File Structure

```
src
├── config
│   └── db.js
├── controllers
│   ├── authController.js
│   ├── speakerController.js
│   └── bookingController.js
├── middlewares
│   └── authMiddleware.js
├── models
│   ├── Booking.js
│   ├── index.js
│   ├── Speaker.js
│   └── User.js
├── routes
│   ├── authRoutes.js
│   ├── book-session.js
│   ├── bookingRoutes.js
│   └── speakerRoutes.js
├── utils
│   ├── calendarService.js
│   └── emailService.js
└── .env
```

## Postman Test Collection

Here’s a sample Postman test collection with API endpoints and sample scripts:

### 1. User Signup

**Endpoint:** `POST /api/auth/signup`

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Signup successful. Please verify your email with the OTP sent."
}
```

### 2. User Login

**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "jwt-token-here"
}
```

### 3. Create Speaker Profile

**Endpoint:** `POST /api/speakers`

**Headers:**
- `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "expertise": "Public Speaking",
  "pricePerSession": 100
}
```

**Response:**
```json
{
  "message": "Speaker profile created successfully."
}
```

### 4. Book Session

**Endpoint:** `POST /api/bookings`

**Headers:**
- `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "speakerId": "speaker-id",
  "timeSlot": "2024-08-20T10:00:00Z"
}
```

**Response:**
```json
{
  "message": "Session booked successfully.",
  "calendarEventLink": "calendar-event-link-here"
}
```

### 5. Get Speaker List

**Endpoint:** `GET /api/speakers`

**Response:**
```json
[
  {
    "id": "speaker-id",
    "name": "Jane Doe",
    "expertise": "Tech Talks",
    "pricePerSession": 150
  }
]
```

### 6. Block Time Slot

**Endpoint:** `POST /api/bookings/block-slot`

**Headers:**
- `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "speakerId": "speaker-id",
  "timeSlot": "2024-08-20T10:00:00Z"
}
```

**Response:**
```json
{
  "message": "Time slot blocked successfully."
}
```

## Running the Project

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Set Up Environment Variables:**
   Create a `.env` file and add your environment variables.

3. **Start the Server:**
   ```bash
   npm start
   ```

4. **Run Tests:**
   ```bash
   npm test
   ```
