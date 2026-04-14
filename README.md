# 🎓 AI Study Planner & Productivity SaaS

<img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/4ce4c22c-9255-4ba0-b223-95fc55311cb5" />


> **Transform your learning journey with a premium, AI-driven study ecosystem built for elite academic performance.**

---

## 🌟 Overview
The **AI Study Planner** is a full-stack SaaS application designed to empower students with intelligent task management, deep-work optimization, and personalized analytics. Inspired by the clean aesthetics of Notion and the gamification of Duolingo, it offers a high-fidelity experience that makes productivity feel like a game.

---

## ✨ Core Features

### 🤖 AI Study Assistant
- **Smart Planning**: Generate optimized study schedules based on your specific subjects and deadlines.
- **Native Chatbot**: A floating AI assistant always ready to answer questions, summarize notes, or provide motivation.
- **Smart Insights**: Real-time periodic feedback on your study habits and focus scores.

### ⏱️ Deep Work & Focus Mode
- **Cinematic Timer**: A dedicated "Flow State" overlay with a circular SVG progress ring and ambient dimming.
- **Focus Scoring**: Automatically calculates your concentration levels based on session data.

### 📊 Intelligence Dashboard
- **KPI Metrics**: Real-time cards tracking Study Time, Tasks Done, Streak, and Focus Score.
- **Analytics Hub**: High-fidelity charts (Recharts) visualizing your weekly momentum and subject distribution.
- **Activity Heatmap**: A GitHub-style contribution graph for your study consistency.

### 🎮 Gamification System
- **XP & Leveling**: Earn experience points for every completed task and study session.
- **Level Progress**: Visual progress bars and milestone tracking.
- **Badges**: Unlockable achievements as you build long-term study streaks.

---

## 🎨 Visual Gallery

**Dashboard Overview**
<img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/2b82e49a-0886-4b03-9dba-1e1f7dde542c" />
<img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/3d81c549-f306-44be-9b6d-0d5a31e56673" />

**Focus Mode**
<img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/d7b205a4-497f-4534-a8c5-0cfcd9fcbcd1" />

**Planner**
<img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/e81fde14-97f1-4ea1-b0f0-137ddad262f5" />

**Analytics Hub**
<img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/554699ef-4911-4df4-a193-5aff59aac8b9" />


---

## 🛠️ Tech Stack

- **Frontend**: 
  - React 19 (Hooks, Context API)
  - Tailwind CSS (Premium SaaS UI Design)
  - Framer Motion (Page Transitions & Micro-animations)
  - Recharts (Interactive Data Visualization)
  - Lucide React (Icon System)
- **Backend**:
  - Node.js & Express
  - MongoDB (Mongoose ODM)
  - JWT (Secure Authentication)
- **Security**:
  - Helmet.js (Security Headers)
  - Express-Rate-Limit (DDOS Protection)

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18+)
- MongoDB (Running locally or MongoDB Atlas URI)

### 2. Backend Setup
```bash
cd server
npm install
```
Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_super_secret_key
```
Run the server:
```bash
node server.js
```

### 3. Frontend Setup
```bash
cd client
npm install
npm start
```

---

## 🔑 Default Access
- **Admin Email**: `admin@study.com`
- **Password**: `admin123`
*(Admin access allows you to manage users, view system-wide audits, and toggle user account status.)*

---

## 📁 Repository Structure
```text
StudyPlannerWithAI/
├── client/              # React frontend & Tailwind config
├── server/              # Express backend & API modules
├── screenshots/         # UI Showcase images
└── README.md            # Project documentation
```

---

> [!TIP]
> **Pro Tip**: Use the **Focus Mode** (Target icon in the Dashboard) for 25 minutes to maximize your focus score and earn bonus XP!

