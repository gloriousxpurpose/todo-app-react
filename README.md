# 📋 Task Manager - Modern React Application

A beautiful, modern task management application built with React, Vite, and Tailwind CSS. Features a stunning glassmorphism UI design with gradient backgrounds and smooth animations.

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.3.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.18-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-5.0.11-000000?style=for-the-badge)

## ✨ Features

### 🎨 Modern UI Design
- **Glassmorphism Effects** - Beautiful frosted glass cards with backdrop blur
- **Gradient Backgrounds** - Vibrant indigo, purple, and pink gradients
- **Smooth Animations** - Polished transitions and hover effects
- **Responsive Design** - Fully optimized for mobile, tablet, and desktop

### 🔐 Authentication
- User registration with validation
- Secure login system
- Password visibility toggle
- Form error handling with visual feedback

### ✅ Task Management
- Create, read, update, and delete tasks
- Set task priorities (High, Medium, Low)
- Mark tasks as complete with checkboxes
- Set deadlines with date picker
- Real-time task status updates

### 🔍 Advanced Filtering
- Search tasks by title
- Filter by priority level
- Sort by newest/oldest
- Clear all filters with one click

### 📱 Responsive Design
- Mobile-first approach
- Breakpoints: 375px (mobile), 768px (tablet), 1024px+ (desktop)
- Touch-friendly interface
- Optimized layouts for all screen sizes

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/task-react.git
   cd task-react
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=your_api_url_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173`

## 📦 Build for Production

```bash
npm run build
# or
yarn build
```

The optimized production build will be in the `dist` folder.

## 🛠️ Tech Stack

### Core
- **React 19.2.0** - UI library
- **Vite 7.3.1** - Build tool and dev server
- **React Router 7.13.0** - Client-side routing

### Styling
- **Tailwind CSS 4.1.18** - Utility-first CSS framework
- **@tailwindcss/vite** - Vite integration for Tailwind

### State Management
- **Zustand 5.0.11** - Lightweight state management

### HTTP Client
- **Axios 1.13.5** - Promise-based HTTP client

### Development Tools
- **ESLint** - Code linting
- **Vite Plugin React** - Fast refresh and JSX support

## 📁 Project Structure

```
task-react/
├── public/              # Static assets
├── src/
│   ├── hooks/          # Custom React hooks
│   │   ├── useLogin.jsx
│   │   └── useRegister.jsx
│   ├── layouts/        # Layout components
│   │   ├── AuthLayout.jsx
│   │   └── TaskLayout.jsx
│   ├── pages/          # Page components
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── EntryTask.jsx
│   │   └── Task.jsx
│   ├── store/          # Zustand stores
│   │   ├── taskStore.js
│   │   └── userStore.js
│   ├── App.jsx         # Main app component
│   └── main.jsx        # Entry point
├── .env.example        # Environment variables template
├── package.json        # Dependencies and scripts
├── vite.config.js      # Vite configuration
└── README.md           # This file
```

## 🎨 Design System

### Color Palette
- **Primary Gradient**: Indigo (600) → Purple (600)
- **Background**: Indigo (500) → Purple (500) → Pink (500)
- **Priority Colors**:
  - 🔴 High: Red (100/700)
  - 🟡 Medium: Yellow (100/700)
  - 🟢 Low: Green (100/700)

### Visual Style
- **Glassmorphism**: Semi-transparent backgrounds with backdrop blur
- **Shadows**: Layered shadows for depth (lg, xl, 2xl)
- **Border Radius**: Rounded corners (xl, 2xl, 3xl)
- **Transitions**: Smooth 200ms animations

## 📸 Screenshots

### Login Page
Modern authentication with glassmorphism design and animated background.

### Task Dashboard
Comprehensive task management with filtering and search capabilities.

### Create/Edit Task
Intuitive form with icon-enhanced inputs and validation.

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 API Integration

This application requires a backend API. Configure the API URL in your `.env` file:

```env
VITE_API_URL=https://your-api-url.com
```

### Expected API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create new task
- `GET /api/tasks/:id` - Get task by ID
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `PATCH /api/tasks/:id/status` - Update task status

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Design inspiration from modern SaaS applications
- Icons from Heroicons
- UI components styled with Tailwind CSS

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

**Made with ❤️ using React, Vite, and Tailwind CSS**
