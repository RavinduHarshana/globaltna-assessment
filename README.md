# 🛠️ GlobalTNA – Service Request Board

![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js)
![React](https://img.shields.io/badge/React-20232A?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js)
![Express](https://img.shields.io/badge/Express.js-404D59?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?logo=mongodb)
![JWT](https://img.shields.io/badge/JWT-black?logo=jsonwebtokens)
![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel)
![Railway](https://img.shields.io/badge/Railway-131415?logo=railway)

A clean and responsive full-stack service request platform built for the **GlobalTNA Full-Stack Developer Intern Assessment**. <br>
- 🌍 Any user can browse and view all service requests without authentication.
- 🔐 Authenticated users can securely create, update, and delete only their own service requests using JWT authentication.
- 👤 Users can manage their posted requests through a personalized **My Requests Dashboard**.

---
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

```bash
globaltna-service-board/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── tests/
│   │   └── server.ts
│   │
│   ├── .env
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   ├── public/
│   ├── styles/
│   ├── types/
│   └── package.json
│
├── README.md
└── .gitignore
```
---

## 📡 API Endpoints

### Auth Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user & get JWT token |

---

### Service Request Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/jobs` | Get all service requests |
| GET | `/api/jobs/:id` | Get single request |
| POST | `/api/jobs` | Create new request *(Protected)* |
| PUT | `/api/jobs/:id` | Update request *(Protected)* |
| DELETE | `/api/jobs/:id` | Delete request *(Protected)* |

---

### Example Request

#### Create Service Request

```http
POST /api/jobs
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

#### Request Body

```json
 {
    "title": "Gardener needed for lawn maintenance",
    "description": "Need regular lawn mowing and hedge trimming for a medium-sized garden.",
    "category": "Gardening",
    "location": "Liverpool",
    "contactName": "Emma Johnson",
    "contactEmail": "emma.johnson@example.com"
  }
```

#### Success Response

```json
{
    "status": "success",
    "data": {
        "_id": "6a081e5e18d56bb931e6645a",
        "title": "Need wall painting for shop",
        "description": "Small grocery shop needs exterior wall painting before opening.",
        "category": "Painting",
        "location": "Matara",
        "contactName": "Dinesh Kumara",
        "contactEmail": "dinesh.k@gmail.com",
        "status": "In Progress",
        "__v": 0,
        "createdAt": "2026-05-16T07:35:58.623Z",
        "updatedAt": "2026-05-17T05:11:53.544Z"
    },
    "message": "Job fetched successfully",
    "error": null
}
```

### Example Authorization Header

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

---

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user and receive JWT token |

---


### Login Response Example

```json
{
    "name":"Nimal", 
    "email":"Nimal@gmail.com",
    "password":"Nimal@1234"
}
```

---
### Login Response Example

```json
{
    "_id": "6a098e6e2e676d13abdb7b4f",
    "name": "Nimal",
    "email": "Nimal@gmail.com",
    "token": "JWT_Toket Here"
}
```

