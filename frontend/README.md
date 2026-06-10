# Dehurdle — React Client (Frontend)

This is the frontend client for Dehurdle, built using **React (v19)**, **Vite**, and **Tailwind CSS**.

---

## 🛠️ Local Development Setup

### Prerequisites
*   Node.js (v18 or higher)
*   The Dehurdle Backend API running locally.

### Setup Instructions
1. Navigate to this directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure the backend API URL. Create a `.env` file in the root of the `frontend` directory:
   ```env
   VITE_API_URL=http://localhost:8080
   ```
4. Start the Vite development server:
   ```bash
   npm run dev
   ```
   The frontend will be running at [http://localhost:5173](http://localhost:5173).

---

## ☁️ Production Deployment on Vercel

The Dehurdle frontend is configured for optimized deployment on **Vercel**.

### ⚙️ Vercel Deployment Settings
*   **Framework Preset**: `Vite`
*   **Root Directory**: `frontend`
*   **Build Command**: `npm run build`
*   **Output Directory**: `dist`
*   **Single Page App Routing**: Handled via [`frontend/vercel.json`](file:///Users/nitesh/Documents/crio/dehurdle/frontend/vercel.json) to redirect all client-side routes back to `/index.html`.

### 🔑 Environment Variables
When configuring the project in the Vercel dashboard, make sure to add the following environment variable to connect the frontend to the deployed AWS EC2 backend:

| Key | Value | Description |
| :--- | :--- | :--- |
| **`VITE_API_URL`** | `http://13.232.86.104:8080` | URL of the live deployed AWS EC2 backend API |

---

## 🎨 Tech Stack & UI Highlights
*   **React Router v7**: Used for seamless page navigation and user authentication guards.
*   **Tailwind CSS v4**: Modern styling framework integrated with Vite for utility-first responsive designs.
*   **Status Indicators**: Dynamic due date proximity status chips implemented across the task cards and modals.
*   **Context API**: Global state management for user authentication (Login/Logout session persistence).
