# Dehurdle — Full-Stack Task Manager

Dehurdle is a modern, full-stack Task Management Application designed to help users organize, track, and complete their tasks efficiently. It features a secure user authentication system, responsive task boards, task priority metrics, due-date status chips, and profile management.

---

## 🏗️ Project Architecture & Structure

The repository is organized into a monorepo-like structure with two primary components:

*   **[`frontend`](file:///Users/nitesh/Documents/crio/dehurdle/frontend)**: A fast and responsive React client built using **Vite**, **Tailwind CSS**, and **React Router**.
*   **[`backend`](file:///Users/nitesh/Documents/crio/dehurdle/backend)**: A RESTful API server built using **Node.js**, **Express**, **MongoDB (Mongoose)**, and secured with **JSON Web Tokens (JWT)**.

```bash
dehurdle/
├── backend/            # Express REST API
│   ├── src/            # Backend source code
│   └── package.json    # Backend configuration & dependencies
├── frontend/           # React + Vite client
│   ├── src/            # Frontend source code
│   └── package.json    # Frontend configuration & dependencies
├── setup.sh            # Automation script to set up both environments
└── README.md           # Main documentation file (this file)
```

---

## ⚡ Quick Start (Local Setup)

The quickest way to get both the frontend and backend running locally is using the included CLI setup script:

```bash
# Give execution permissions to the script
chmod +x setup.sh

# Run the setup script to install dependencies and configure local environment variables
./setup.sh
```

Alternatively, you can navigate to the respective directories and set them up manually.

### 🔌 Backend Local Setup
1. Navigate to backend: `cd backend`
2. Install dependencies: `npm install`
3. Configure environment variables inside `.env` (refer to `.env.example`):
   ```env
   PORT=8080
   DATABASE_URL=mongodb://localhost:27017/dehurdle  # or MongoDB Atlas URI
   JWT_SECRET=your_jwt_secret_key_here
   CORS_ORIGIN=http://localhost:5173
   ```
4. Start development server: `npm run dev` (runs on `http://localhost:8080`)

### 🎨 Frontend Local Setup
1. Navigate to frontend: `cd frontend`
2. Install dependencies: `npm install`
3. Configure environment variables inside `.env` (refer to `.env.example`):
   ```env
   VITE_API_URL=http://localhost:8080
   ```
4. Start Vite development server: `npm run dev` (runs on `http://localhost:5173`)

---

## ☁️ Production Deployment

*   **Backend (AWS EC2)**: The Node.js backend is deployed on an AWS EC2 instance managed by PM2. Detailed steps, security group rules, and connection instructions are documented in the **[backend/README.md](file:///Users/nitesh/Documents/crio/dehurdle/backend/README.md#-production-aws-ec2-deployment-guide-backend-only)**.
*   **Frontend (Vercel)**: The React client is deployed on Vercel with single-page routing configuration. Setup steps and environment variable settings are documented in the **[frontend/README.md](file:///Users/nitesh/Documents/crio/dehurdle/frontend/README.md#-production-deployment-on-vercel)**.


