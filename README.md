# **Lumibyte AI – Full-Stack Chat Application**

A modern full-stack AI chat application built with **React**, **Node.js**, and **Express**, featuring structured responses, real-time UI updates, beautiful cards, tables, dark/light mode, and a clean sidebar UX.

---

## 🚀 **Features**

### **Frontend (React)**

* Modern UI with Tailwind CSS + custom animations
* Fully responsive (mobile + desktop)
* Sidebar with recent chats
* Welcome screen with suggestions
* Chat messages with floating, typing, fade-in animations
* AI responses with **structured tables**
* Dark/light theme toggle
* Pixel-perfect layout (sidebar + main content alignment)
* Auto-expanding chat input
* Smooth transitions everywhere

### **Backend (Node.js + Express)**

* REST APIs for:

  * Creating new chat sessions
  * Sending user messages
  * Retrieving session history
  * Fetching session list
* Mock database (file-based) for testing
* CORS enabled for local development

---

## 📁 **Project Structure**

```
chat-app-project/
│
├── backend/
│   ├── server.js
│   ├── mockData.js
│   ├── package.json
│   ├── package-lock.json
│
└── frontend/
    ├── public/
    │   ├── index.html
    │   ├── favicon.ico
    │   ├── manifest.json
    │   └── robots.txt
    ├── src/
    │   ├── components/
    │   │   ├── Sidebar.js
    │   │   ├── ChatWindow.js
    │   │   ├── ChatInput.js
    │   │   ├── TableResponse.js
    │   │   ├── ThemeToggle.js
    │   │   └── AnswerFeedback.js
    │   ├── hooks/
    │   │   └── useMobile.js
    │   ├── App.js
    │   ├── index.js
    │   └── index.css
    ├── package.json
    ├── package-lock.json
    ├── tailwind.config.js
    └── postcss.config.js
```

---

## 🖥️ **Running the Project Locally**

### **1️⃣ Start the backend**

```
cd backend
npm install
node server.js
```

Backend default URL: `http://localhost:5000`

---

### **2️⃣ Start the frontend**

```
cd frontend
npm install
npm start
```

Frontend default URL: `http://localhost:3000`

---

## 🔥 APIs Used (Backend)

### **POST /api/new-chat**

Creates new chat session.

### **GET /api/sessions**

Returns list of chat sessions.

### **GET /api/session/:id**

Returns full chat history for a session.

### **POST /api/chat/:id**

Sends user message and returns AI response.

---

## 🎨 **Tech Stack**

### **Frontend**

* React
* Tailwind CSS
* React Router
* Custom animations
* Glass UI + gradients

### **Backend**

* Node.js
* Express.js
* File-based mock DB

---

## 📌 Notes

* `node_modules` folders are ignored using `.gitignore`
* Project works perfectly on mobile and desktop
* Sidebar alignment, chat input, and navbar layout are optimized

---

## 🤝 **Author**

**Manoj Kumar Balini**

GitHub: [https://github.com/ManojkumarBalini](https://github.com/ManojkumarBalini)
Project Repo: [https://github.com/ManojkumarBalini/chat-app-project](https://github.com/ManojkumarBalini/chat-app-project)
