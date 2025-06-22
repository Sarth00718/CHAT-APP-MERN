# 💬 CHAT APPLICATION MERN

A real-time chat application built with the **MERN** stack (MongoDB, Express.js, React.js, Node.js) and **Socket.IO** for instant communication.

---

## 🔧 Key Features

- ✅ Real-time messaging with instant delivery using WebSockets (Socket.IO)
- ✅ User authentication with JWT (JSON Web Tokens)
- ✅ Typing indicators, message timestamps, and read receipts
- ✅ Fully responsive UI built with Tailwind CSS
- ✅ Efficient state management using Redux Toolkit

---

## 🧠 Tech Stack

### 🔹 Frontend
- React.js
- Redux Toolkit
- Tailwind CSS
- Socket.IO Client

### 🔹 Backend
- Node.js
- Express.js
- Socket.IO Server
- MongoDB (via Mongoose)

### 🔹 Authentication
- JSON Web Tokens (JWT)

### 🔹 Database
- MongoDB Atlas

---

## 📦 How It Works

1. **Backend** handles:
   - User registration & login
   - Real-time socket communication
   - Message storage in MongoDB

2. **Frontend** connects to backend using:
   - REST API for user and message data
   - Socket.IO for real-time updates

3. **Messages** are stored in MongoDB and synced on login/refresh.

---

## 🚀 Getting Started

### 📁 Clone the repository

git clone https://github.com/Sarth00718/CHAT-APP-MERN.git
cd CHAT-APP-MERN


### 🧱 Install dependencies
=>Backend
cd backend
npm install

=>Frontend
cd ../frontend
npm install

### 🛠️ Set up environment variables
Create a .env file in the backend folder:
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret


### ▶️ Run the application

=>Run backend:
cd backend
npm run dev

=>Run frontend:
cd ../frontend
npm run dev


###

Frontend will run on http://localhost:5173
Backend will run on http://localhost:3000
