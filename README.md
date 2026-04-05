# 🚀 Task Manager App (Full Stack)

A full-stack task management application built using Next.js, Node.js, and Prisma.  
This app allows users to securely manage their tasks with authentication, filtering, and CRUD operations.

---

## 🌍 Live Demo

👉 Frontend: https://task-manager-app-wheat-delta.vercel.app/  
👉 Backend: https://task-manager-app-scsx.onrender.com/

---

## 📌 Features

### 🔐 Authentication
- User Registration & Login
- JWT-based authentication (Access Token + Refresh Token)
- Secure password hashing using bcrypt
- Protected routes

### 📝 Task Management
- Create, Read, Update, Delete (CRUD) tasks
- Toggle task status (Pending / Completed)
- Tasks are user-specific (secure access)

### 🔍 Advanced Features
- Search tasks by title
- Filter tasks by status
- Pagination support

### 🎨 Frontend
- Responsive UI (mobile + desktop)
- Clean dashboard layout
- User session handling (auto login with refresh token)

---

## 🛠️ Tech Stack

### Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS

### Backend
- Node.js
- Express.js
- TypeScript

### Database
- Prisma ORM
- SQLite

### Authentication
- JWT (Access + Refresh Tokens)
- bcrypt

### Deployment
- Frontend: Vercel
- Backend: Render

---

## ⚙️ Installation & Setup (Local)

### 1. Clone Repository
```bash
git clone https://github.com/your-username/task-manager-app
cd task-manager-app
```
---

### 2. Backend Setup
```bash
cd backend
npm install
npx prisma migrate dev
npm run dev
```

---

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

### 4. Open in Browser
```
http://localhost:3000
```

---

## 🔐 Environment Variables

### Backend (.env)

```
DATABASE_URL=file:./dev.db
JWT_SECRET=secret123
REFRESH_SECRET=refreshsecret123
PORT=5000
```

---

## 📂 Project Structure

```
task-manager-app/
│
├── backend/
│   ├── src/
│   ├── prisma/
│   └── ...
│
├── frontend/
│   ├── app/
│   ├── public/
│   └── ...
```

---

## 🚀 Key Learnings

- Implemented secure authentication using JWT & refresh tokens
- Built RESTful APIs with proper validation and error handling
- Integrated Prisma ORM with SQL database
- Handled real-world deployment issues:
  - CORS configuration
  - Production database migration
  - Frontend-backend integration
- Deployed full-stack app using Vercel and Render

---

## 📌 Future Improvements

- Add due dates & task priority
- Drag-and-drop task management
- Better UI/UX enhancements
- Switch to PostgreSQL for production

---

## 👩‍💻 Author

**Aastha**

---

## ⭐ If you like this project

Give it a ⭐ on GitHub!
