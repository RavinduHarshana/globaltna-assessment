# 🛠️ GlobalTNA – Service Request Board

![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js)
![React](https://img.shields.io/badge/React-20232A?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js)
![Express](https://img.shields.io/badge/Express.js-404D59?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?logo=mongodb)
![JWT](https://img.shields.io/badge/JWT-black?logo=jsonwebtokens)
![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel)
![Railway](https://img.shields.io/badge/Railway-131415?logo=railway)

A clean, responsive full-stack service request platform built for the **GlobalTNA Full-Stack Developer Intern assessment**.  
Users can browse, create, update, and delete service requests securely using JWT authentication.

<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/23a6c05f-2071-4422-9ab5-9dcfa0edb03d" />

---

## 🚀 Live Demo

- 🌐 Frontend: [https://globaltna-assessment-nine.vercel.app]
- ⚙️ Backend: [https://globaltna-assessment-production.up.railway.app/api]

## Demo user
    Email: Amal@gmail.com
    Password: 1234

---

## 🏗️ System Architecture

## ✨ Features
Core Features
  RESTful CRUD API
  Responsive UI with Next.js + Tailwind CSS
  Real-time category filtering

## Bonus Features
   🔐 JWT Authentication (Login/Register)<br>
   👤 My Requests Dashboard<br>
   🔎 Keyword search (title & description)<br>
   🧪 Jest + Supertest testing (100% passing)<br>
   🌱 Database seeding script<br>
   ☁️ Deployed on Vercel & Railway<br><br>

## 🛠️ Tech Stack
| Layer      | Technologies                                                 |
| ---------- | ------------------------------------------------------------ |
| Frontend   | Next.js 14, React, TypeScript, Tailwind CSS, React Hot Toast |
| Backend    | Node.js, Express.js, TypeScript, JWT, bcryptjs               |
| Database   | MongoDB Atlas, Mongoose                                      |
| Testing    | Jest, Supertest, ts-jest                                     |
| Deployment | Vercel, Railway                                              |


## ⚙️ Environment Variables
### Backend<br>
    PORT=5000<br>
    MONGO_URI=your_mongodb_connection_string<br>
    JWT_SECRET=your_super_secret_jwt_key<br>

### frontend (frontend/.env.local)
    NEXT_PUBLIC_API_URL=http://localhost:5000/api/jobs

## 💻 Local Setup

### 1. Clone the repository
     git clone https://github.com/RavinduHarshana/globaltna-assessment<br>
     cd globaltna-assessment

### 2. Backend Setup
    cd backend
    npm install
    npm run dev

### database seed
    npx ts-node src/seed.ts
    
Frontend Setup

    cd frontend
    npm install
    npm run dev

Open:
  http://localhost:3000

## 🧪 Run Tests
    cd backend
    npm test

## 📌 Project Structure
<br>
&emsp;backend/<br>
&emsp; frontend/<br>
  &emsp;&emsp;  │── app/<br>
  &emsp;&emsp;  │── components/<br>
  &emsp;&emsp;  │── pages/<br>
  &emsp;&emsp;  │── styles/<br>
