# Product Management Web App

A fullstack product management application with user authentication, product CRUD, filtering, and protected routes. Built using **React.js (frontend)** and **NestJS + MongoDB (backend)**.


Live Demo -  [Link]()

Tech Stack:

Frontend - React.js, Axios, React Router
Backend - NestJS, Mongoose, JWT Auth
Database - MongoDB


Features:

- User Signup/Login (JWT-based)
- Product Create / Read / Update / Delete
- Protected routes using JWT
- Search and Filter products
- Logout functionality

User Auth:

- **Login:** `/login`
- **Signup:** `/signup`
- **Token Storage:** LocalStorage
- **Protected Routes:** `/products`, `/add`, `/edit/:id`

Product Model:
{
  "name": "string",
  "description": "string",
  "price": number
}

Frontend Setup:
cd client
npm install
npm run dev

Backend Setup:
cd server
npm install
npm run start:dev

Folder Structure:

/client     → React frontend
/server     → NestJS backend