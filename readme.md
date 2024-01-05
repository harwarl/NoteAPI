# NOTE API

This is the codebase for NoteAPI, a RESTful API built with Node.js, Express, and PostgreSQL. It provides endpoints for managing notes, user authentication, and other related functionalities.

## SETUP

1. Clone the repository

```bash
git clone https://github.com/harwarl/NoteAPI.git
cd NoteAPI
```

2. Install dependencies using yarn

```bash
yarn install
```

OR simply

```bash
yarn
```

3. Configure the environment varaibles
   Create a .env file in the project root and set the following variables:

```bash
PORT=3030
DATABASE_URL=YOUR_POSTGRESQL_DATABASE_URL
```

Replace YOUR_POSTGRESQL_DATABASE_URL with your actual PostgreSQL database URL.

4. Run the Migrations

```bash
yarn migrate:up
```

5. Start the server

```bash
yarn start
```

## Features

### Rate Limiting

The API implements rate limiting to prevent abuse. It allows a maximum of 100 requests per IP every 15 minutes.

### CORS Configuration

Cross-Origin Resource Sharing (CORS) is configured to allow specific headers, methods, and origins for improved security.

### Routes

#### Auth Routes: /api/auth

`/signup`: Register a new user.
`/login`: Log in an existing user.
`/logout`: Log out the authenticated user.

#### Note Routes: /api/notes

`/`: Get all user notes. [POST]
`/:id`: Get a specific note by ID. [GET]
`/`: Create a new note. [POST]
`/:id/share`: Share a note. [POST]
`/:id`: Update a note. [PUT]
`/:id`: Delete a note. [DELETE]

#### Other note Routes /api

`/shared/:id`: Get a shared note. [GET]
`/search`: Search notes. [GET]
`/`: Root route providing information about the API.

### Usage

#### Root Route

Visit http://localhost:3030/ to view basic information about the NoteAPI, including the GitHub repository link.

#### Auth Routes

Signup:

Method: POST
Endpoint: /api/auth/signup
Body: { "username": "your_username", "email": "your_email", "password": "your_password" }
Login:

Method: POST
Endpoint: /api/auth/login
Body: { "email": "your_email", "password": "your_password" }
Logout:

Method: POST
Endpoint: /api/auth/logout
Requires authentication.

#### Note Routes

Refer to the routes in note.route.js for CRUD operations on user notes.

#### Other Routes

Refer to the routes in others.route.js for additional API functionalities.

#### NoteAPI Repository

Visit the NoteAPI GitHub Repository for more details and contributions.

Note
If you encounter any issues or have suggestions, feel free to create an issue on the GitHub repository. Happy coding!
