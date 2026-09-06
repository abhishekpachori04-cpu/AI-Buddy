# 🤖 AI Buddy

> A modern AI-powered chat application built with React, Tailwind CSS, Node.js, Express, and Google's Gemini API.

🚀 **Live Demo:** [https://ai-buddy-tau-six.vercel.app](https://ai-buddy-tau-six.vercel.app)  
⚙️ **Backend API (Render):** [https://ai-buddy-1-hvt6.onrender.com](https://ai-buddy-1-hvt6.onrender.com)

---

# 🤖 AI Buddy

> A modern AI-powered chat application built with React, Tailwind CSS, Node.js, Express and Google's Gemini API.

AI Buddy is a ChatGPT/Gemini-inspired AI assistant that allows users to ask questions, receive AI-generated responses, manage multiple conversations, and organize their chat history through a clean and responsive interface.

---

## ✨ Features

### 💬 AI Chat
- Ask questions and get AI-generated responses
- Gemini API integration through a secure backend
- Streaming AI responses for a better chat experience
- Markdown and GitHub Flavored Markdown (GFM) support
- Code blocks and formatted responses

### 🗂️ Chat Management
- Create a new chat
- Automatically save conversations
- Open previous conversations
- Rename chats
- Delete chats
- Pin / unpin important chats
- Separate **Pinned** and **Recent** conversations
- Chat history persists using browser LocalStorage

### ⚡ Chat Controls
- Regenerate AI responses
- Stop AI response generation
- Loading / thinking indicator
- Enter to send messages
- Shift + Enter for multiline input

### 🎨 UI & UX
- Modern ChatGPT-inspired interface
- Dark mode
- Light mode
- Responsive layout
- Mobile-friendly structure
- Smooth hover and transition effects
- Clean sidebar navigation

### 🔐 Security
- Gemini API key is stored on the backend
- API key is not exposed in the React frontend
- Environment variables are used for sensitive configuration

---

## 🛠️ Tech Stack

### Frontend

- React
- JavaScript
- Tailwind CSS
- React Markdown
- Remark GFM
- Vite

### Backend

- Node.js
- Express.js
- Google Gemini API
- Server-Sent Events (SSE)
- dotenv
- CORS

### Storage

- Browser LocalStorage

---

## 📂 Project Structure

```text
AI-Buddy/
│
├── backend/
│   ├── Server.js
│   ├── package.json
│   ├── package-lock.json
│   └── .env
│
├── public/
│
├── src/
│   ├── component/
│   │   ├── Chat.jsx
│   │   ├── ChatManager.jsx
│   │   ├── Chatlist.jsx
│   │   ├── MessageAction.jsx
│   │   ├── PromptBox.jsx
│   │   └── Sidebar.jsx
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── package.json
├── package-lock.json
└── README.md