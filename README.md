# Job Task Manager

## 📝 Short Description
Job Task Manager is a web-based application that helps users manage tasks efficiently. It allows users to add, edit, delete, and reorder tasks using drag-and-drop functionality. The app supports user authentication and real-time task updates.

## 🚀 Live Links
- **Frontend:** [Job Task Manager Client](https://task-manager-client-ca5a5.web.app)
- **Backend:** [Job Task Manager Server](https://job-task-server-brown.vercel.app/)

## 📦 Dependencies
### Frontend
```json
"dependencies": {
    "@dnd-kit/core": "^6.3.1",
    "@dnd-kit/sortable": "^10.0.0",
    "@dnd-kit/utilities": "^3.2.2",
    "@hello-pangea/dnd": "^18.0.1",
    "@tanstack/react-query": "^5.66.9",
    "firebase": "^11.3.1",
    "localforage": "^1.10.0",
    "match-sorter": "^8.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-icons": "^5.5.0",
    "react-router-dom": "^7.2.0",
    "sort-by": "^1.2.0",
    "sweetalert2": "^11.17.2"
}
```

### Backend
```json
"dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.4.7",
    "express": "^4.21.2",
    "mongodb": "^6.13.0"
}
```

## 🔧 Installation Steps
### Frontend
1. Clone the repository:
   ```bash
   git clone https://github.com/rizowan-rafi/taskManager-client.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Backend
1. Clone the repository:
   ```bash
   git clone https://github.com/rizowan-rafi/taskManager-server.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Start the server:
   ```bash
   npm start
   ```

## 🛠️ Technologies Used
### Frontend
- React.js
- React Router
- Tailwind CSS & DaisyUI
- Firebase Authentication
- Drag-and-Drop (dnd-kit)
- SweetAlert2 for notifications
- React Query for state management

### Backend
- Node.js & Express.js
- MongoDB with Mongoose
- CORS & dotenv for environment configuration

## 📌 Features
- User Authentication with Firebase
- Task Management (CRUD operations)
- Drag-and-Drop Reordering
- Responsive UI with Tailwind CSS
- Real-time Updates using React Query

---

📌 Developed by **Rizowan Mahmud Rafi**

