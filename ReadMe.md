# TeamSpace - A Collaborative Workspace Platform

## Introduction

TeamSpace is a web-based platform designed to enhance teamwork and productivity by providing a virtual environment for document sharing, real-time editing, and effective team communication. The platform aims to replace traditional office settings with a digital workspace tailored for remote teams, fostering seamless collaboration and efficient workflows.

## Project Type

Fullstack

## Deployed App

Frontend: [https://bespoke-gecko-5a4936.netlify.app]
Backend: [https://teamspace.onrender.com]
Database: [https://teamspace.onrender.com]

## Directory Structure

Teamspace/
├─ backend/
├─ controllers/
├─ middlewares/
├─ models/  
 ├─ node_modules/  
 └─ server.js
├─ frontend/
├─TeamSpace2/
├─ public/
├─ src/
├─ assets/
├─ components/
├─ pages/
├─ Auth/
└─ App.js
└─ README.md

## Video Walkthrough of the Project

https://drive.google.com/file/d/1QMBXFTOMOKjg0CpLBwlzh1dFesFbvHcN/view?usp=sharing

## Video Walkthrough of the Codebase

https://drive.google.com/file/d/1J03C__X8iw3Ni4LrnP6G5fvSvuN9qVfw/view?usp=sharing

## Features

- **User Authentication**: Secure registration and login via email/password or social media accounts.
- **Workspace Creation**: Users can create and manage multiple workspaces, invite team members, and assign roles.
- **Real-time Document Editing**: Collaborative editing with live updates for all participants using WebSocket technology.

## Design Decisions or Assumptions

- **Real-time Collaboration**: Implemented using WebSocket for smooth and efficient data synchronization.
- **Responsive Design**: Optimized for both desktop and mobile users.
- **Technology Stack Selection**: Chosen for scalability and ease of development.

## Installation & Getting Started

Follow these steps to set up the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/username/teamspace.git
   cd teamspace
   ```
2. Install dependencies:
   npm install

3. Start the backend server:
   cd backend
   npm run dev

4. Start the frontend development server:
   cd frontend/TeamSpace2/
   npm run dev

## Credentials

Email: tarunrathore200@gmail.com
Password: tbnr hzmp lkgi cvtl

## API Endpoints

### User Authentication

- `POST /api/auth/register` - Register a new user.
- `POST /api/auth/login` - Log in an existing user.

### Workspace Management

- `POST /api/workspaces` - Create a new workspace.
- `GET /api/workspaces/:id` - Retrieve workspace details.

### Document Sharing

- `POST /api/documents` - Upload a new document.
- `GET /api/documents/:id` - Retrieve a specific document.

### Chat Functionality

- `POST /api/chats/` - Access a specific user’s chat details. Middleware: `protect` for user authentication.
- `GET /api/chats/` - Fetch all chats for the authenticated user. Middleware: `protect`.
- `POST /api/chats/group` - Create a new group chat. Middleware: `protect`.
- `PUT /api/chats/rename` - Rename a group chat. Middleware: `protect`.
- `PUT /api/chats/groupremove` - Remove a user from a group chat. Middleware: `protect`.
- `PUT /api/chats/groupadd` - Add a user to a group chat. Middleware: `protect`.

## Technology Stack

### Backend

- **Node.js**: JavaScript runtime for building server-side applications.
- **Express.js**: Lightweight web application framework for building RESTful APIs.
- **Socket.io**: Enables real-time, bi-directional communication between clients and servers.

### Frontend

- **React.js**: A JavaScript library for building user interfaces.
- **Socket.io-client**: Client-side library for real-time communication with the server.

### Database

- **MongoDB**: NoSQL database for efficient storage and retrieval of data.

### Other Libraries/Modules

- **JSON Web Tokens (JWT)**: For user authentication and secure data transmission.
- **Bcrypt**: To hash and securely store user passwords.
- **Nodemailer**: For sending emails, such as account verification and password resets.
- **Cors**: Middleware to enable cross-origin resource sharing.
- **Dotenv**: To load environment variables from a `.env` file.
