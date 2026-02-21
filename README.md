# 📋 Task Manager

A modern, full-featured task management application built with **React 19**, **Zustand**, and **Tailwind CSS v4**. Features user authentication, CRUD operations on tasks, priority-based filtering, and a sleek responsive UI with a sky/cyan/teal gradient design.

## ✨ Features

- **Authentication** — Register, login, and logout with JWT-based token authentication
- **Task CRUD** — Create, read, update, and delete tasks
- **Status Tracking** — Mark tasks as complete/incomplete with optimistic UI updates
- **Priority Levels** — Assign Low, Medium, or High priority to tasks
- **Filtering & Search** — Filter tasks by priority, sort order, and keyword search
- **Persistent Auth** — Session survives page refresh via Zustand `persist` middleware
- **Responsive Design** — Fully responsive layout for desktop and mobile devices

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [React 19](https://react.dev) |
| **Build Tool** | [Vite 7](https://vite.dev) |
| **State Management** | [Zustand 5](https://zustand.docs.pmnd.rs) |
| **Routing** | [React Router 7](https://reactrouter.com) |
| **HTTP Client** | [Axios](https://axios-http.com) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com) |
| **Backend API** | REST API (Express.js — hosted separately) |

## 📁 Project Structure

```
src/
├── App.jsx                  # Route definitions
├── main.jsx                 # Application entry point
├── index.css                # Global styles / Tailwind imports
├── assets/                  # Static assets
├── hooks/
│   ├── useLogin.jsx         # Login form logic
│   └── useRegister.jsx      # Register form logic
├── layouts/
│   ├── AuthLayout.jsx       # Layout wrapper for auth pages
│   └── TaskLayout.jsx       # Layout wrapper for task pages
├── pages/
│   ├── Login.jsx            # Login page
│   ├── Register.jsx         # Registration page
│   ├── Task.jsx             # Task list / dashboard
│   └── EntryTask.jsx        # Create & edit task form
├── services/
│   └── api/
│       ├── client.js        # Axios instance with interceptors
│       ├── task.js           # Task API endpoints
│       └── user.js           # User/auth API endpoints
└── store/
    ├── taskStore.js          # Zustand store for tasks
    └── userStore.js          # Zustand store for auth/user
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **Yarn** (or npm)

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/task-manager-zustand-react.git
cd task-manager-zustand-react

# Install dependencies
yarn install
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=https://your-api-url.com
```

### Development

```bash
yarn dev
```

The app will be available at `http://localhost:5173`.

### Production Build

```bash
yarn build
yarn preview
```

## 📜 Available Scripts

| Command | Description |
|---|---|
| `yarn dev` | Start the Vite dev server with HMR |
| `yarn build` | Create an optimized production build |
| `yarn preview` | Preview the production build locally |
| `yarn lint` | Run ESLint across the project |

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
