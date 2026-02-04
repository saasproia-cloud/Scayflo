# Express MongoDB JWT Authentication

This project is a Node.js application that implements JWT authentication using Express and MongoDB with Mongoose. It includes email sending functionality using Ethereal and is organized in a structured manner for easy maintenance and scalability.

## Features

- User registration and login with JWT authentication
- Protected routes using JWT middleware
- Email notifications using Ethereal
- Organized directory structure for controllers, models, routes, and services
- Input validation for user data

## Project Structure

```
express-mongo-jwt-auth
├── src
│   ├── app.js
│   ├── server.js
│   ├── config
│   │   ├── db.js
│   │   ├── jwt.js
│   │   └── mailer.js
│   ├── controllers
│   │   ├── auth.controller.js
│   │   └── user.controller.js
│   ├── models
│   │   └── user.model.js
│   ├── routes
│   │   ├── auth.routes.js
│   │   └── user.routes.js
│   ├── middleware
│   │   └── auth.middleware.js
│   ├── services
│   │   ├── auth.service.js
│   │   └── mailer.service.js
│   ├── utils
│   │   ├── validators.js
│   │   └── emailTemplates.js
│   └── tests
│       ├── auth.test.js
│       └── user.test.js
├── package.json
├── .env.example
├── .gitignore
└── README.md
```

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/express-mongo-jwt-auth.git
   ```

2. Navigate to the project directory:
   ```
   cd express-mongo-jwt-auth
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Create a `.env` file based on the `.env.example` file and fill in the required environment variables.

## Usage

1. Start the server:
   ```
   npm start
   ```

2. The server will run on `http://localhost:3000` (or the port specified in your environment variables).

## API Endpoints

- **POST /api/auth/register** - Register a new user
- **POST /api/auth/login** - Login an existing user
- **GET /api/user** - Get user details (protected route)

## Testing

Run the tests using:
```
npm test
```

## License

This project is licensed under the MIT License.