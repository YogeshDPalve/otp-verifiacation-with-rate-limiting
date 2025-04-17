# otp-verifiacation-with-rate-limiting
 
This project implements an OTP (One-Time Password) verification system with rate limiting, built using Node.js, TypeScript, Express, Prisma, Redis, and Twilio.

## Features

- **User Registration**: Users can register their mobile numbers.
- **OTP Generation**: OTPs are generated and sent to users via SMS using Twilio.
- **OTP Verification**: Users can verify their OTPs to complete the authentication process.
- **Rate Limiting**: Protects endpoints from abuse by limiting the number of requests per IP.
- **Redis Integration**: OTPs are stored temporarily in Redis for quick access and expiry management.
- **Prisma ORM**: Manages database interactions with PostgreSQL.


## Key Files

- **`src/index.ts`**: Entry point of the application. Sets up the Express server and routes.
- **`src/controllers/user.controller.ts`**: Contains logic for user registration, OTP generation, and OTP verification.
- **`src/middlewares/rateLimiter.ts`**: Implements rate limiting for endpoints.
- **`src/middlewares/validationMiddleware.ts`**: Validates user input for registration and OTP verification.
- **`src/utils/twilio.ts`**: Handles sending OTPs via Twilio.
- **`src/utils/redis.ts`**: Configures Redis for OTP storage.
- **`prisma/schema.prisma`**: Defines the database schema using Prisma.



## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd otp-verification-with-rate-limiting
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the .env file with the following variables:
   ```bash
   PORT=3000
   DATABASE_URL=your_postgresql_connection_string
   TWILIO_ACCOUNT_SID=your_twilio_account_sid
   TWILIO_AUTH_TOKEN=your_twilio_auth_token
   TWILIO_MOBILE_NO=your_twilio_phone_number
   TOKEN_EXPIRY_TIME=600
   ```
4. Set up the database:
   ```bash
   npx prisma migrate dev --name init 
   ```
5. Start the server:
   ```bash
   npm start
   ```

## Technologies Used

- **Node.js: Backend runtime**
- **TypeScript: Type-safe JavaScript**
- **Express: Web framework**
- **Prisma: ORM for database management**
- **Redis: In-memory data store for OTPs**
- **Twilio: SMS service for sending OTPs**
- **PostgreSQL: Database for storing user data**


## License

`This project is licensed under the MIT License. `
