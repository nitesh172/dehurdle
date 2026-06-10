# Dehurdle — Express REST API (Backend)

This is the backend API server for Dehurdle, built with Node.js, Express, and Mongoose (MongoDB).

---

## 🛠️ Local Development Setup

### Prerequisites
*   Node.js (v18 or higher)
*   MongoDB running locally OR a MongoDB Atlas cloud database connection string.

### Setup Instructions
1. Navigate to this directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root of the `backend` directory (refer to `.env.example`):
   ```env
   PORT=8080
   DATABASE_URL=mongodb://localhost:27017/dehurdle
   JWT_SECRET=your_jwt_secret_key_here
   CORS_ORIGIN=http://localhost:5173
   ```
4. (Optional) Seed the database with mock tasks:
   ```bash
   npm run seed
   ```
5. Start the development server with hot-reloading:
   ```bash
   npm run dev
   ```
   The backend will be running at [http://localhost:8080](http://localhost:8080).

---

## 📡 API Reference

### Public Routes
*   `GET /` - Root endpoint (Welcome message).
*   `GET /health` - Service health status check.
*   `POST /auth/register` - Register a new user account.
*   `POST /auth/login` - Authenticate user and receive a JWT token (cookie or header).

### Protected Routes (Requires Bearer Token or Cookie)
*   `GET /user/profile` - Retrieve the currently authenticated user's profile.
*   `GET /tasks` - Retrieve all tasks for the logged-in user.
*   `GET /tasks/:id` - Retrieve a specific task by its ID.
*   `POST /tasks` - Create a new task.
*   `PATCH /tasks/:id` - Update an existing task.
*   `DELETE /tasks/:id` - Delete a task.

---

## ☁️ Production AWS EC2 Deployment Guide (Backend Only)

Follow these step-by-step instructions to deploy this Node.js backend to an AWS EC2 instance.

### ⚙️ Server Configuration
*   **Instance Type**: `t2.micro` (AWS Free Tier eligible)
*   **Operating System**: Ubuntu Server 24.04 LTS (HVM)
*   **Process Manager**: **PM2** (Keeps the API running continuously and restarts it automatically on server reboots or crashes)

### 🛡️ Security Group Inbound Rules
To allow secure administrator access and public API access:

| Type | Protocol | Port Range | Source | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **SSH** | TCP | 22 | `My IP` (or `0.0.0.0/0`) | Accessing the EC2 shell via SSH |
| **Custom TCP** | TCP | 8080 | `0.0.0.0/0` and `::/0` | Accessing the REST API publicly |

### 🌐 Working Live Endpoint (AWS Public URL)
A sample working endpoint is publicly accessible:
*   **Tasks Route (Protected)**: [http://13.232.86.104:8080/tasks](http://13.232.86.104:8080/tasks) (Returns `401 Unauthorized` with `{ "message": "Access denied. No token provided." }` as expected)
*   **Health Check Route (Public)**: [http://13.232.86.104:8080/health](http://13.232.86.104:8080/health) (Returns `200 OK` with `{ "message": "Health is good" }`)

---

### Step-by-Step Hosting Guide

#### 1. Connect via SSH
Open your local terminal, navigate to your downloaded key-pair `.pem` file directory, adjust key permissions, and connect:
```bash
chmod 400 your-key.pem
ssh -i "your-key.pem" ubuntu@13.232.86.104
```

#### 2. Install Environment Dependencies
Once connected to the instance:
```bash
# Update Ubuntu package indexes
sudo apt update && sudo apt upgrade -y

# Install Node.js v20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install git and PM2 globally
sudo apt install git -y
sudo npm install pm2 -g
```

#### 3. Clone and Initialize Backend
```bash
# Clone the repository
git clone <your-git-repository-url> dehurdle
cd dehurdle/backend

# Install production dependencies
npm install --production
```

#### 4. Configure Production Environment Variables
Create the `.env` configuration file:
```bash
nano .env
```
Add your production database credentials and configuration:
```env
PORT=8080
DATABASE_URL=mongodb+srv://niteshbaghel172_db_user:Sw2YOIXg9bibLQYK@dehurdle-task-manager.r3ctw4o.mongodb.net/?appName=dehurdle-task-manager
JWT_SECRET=JHJKFHSAHFSHDJKBJKSFHA
CORS_ORIGIN=http://localhost:5173
```
*(Press `CTRL + O` then `Enter` to save, and `CTRL + X` to exit).*

#### 5. Run & Keep Alive using PM2 Daemon
Run the server process continuously:
```bash
# Start backend service
pm2 start src/index.js --name "dehurdle-backend"

# Enable auto-start on server reboot
pm2 startup
# (Run the sudo command outputted by the screen)

# Save the configurations
pm2 save
```
Check application status with `pm2 status` or run `pm2 logs` to debug.
