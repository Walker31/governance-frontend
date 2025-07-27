# Governance AI Frontend

A modern React-based frontend application for governance and risk management, built with Vite, Material-UI, and Tailwind CSS.

## 🚀 Features

- **Modern UI/UX**: Built with Material-UI and Tailwind CSS
- **Authentication System**: Complete user authentication with role-based permissions
- **Responsive Design**: Mobile-friendly interface
- **Real-time Chat**: AI-powered chat interface for governance queries
- **Risk Management**: Comprehensive risk analysis and matrix tools
- **Template System**: Dynamic template creation and management
- **User Management**: Role-based access control

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **pnpm** (recommended) or npm
- **Git**

## 🛠️ Installation

1. **Clone the repository** (if not already done):
   ```bash
   git clone <repository-url>
   cd governance-ai
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```
   or
   ```bash
   npm install
   ```

3. **Environment Setup**:
   Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=http://localhost:3000
   VITE_AGENT_URL=http://localhost:8000
   ```

## 🚀 Available Commands

### Development
```bash
# Start development server
pnpm dev
# or
npm run dev
```

### Build
```bash
# Build for production
pnpm build
# or
npm run build
```

### Preview
```bash
# Preview production build
pnpm preview
# or
npm run preview
```

### Linting
```bash
# Run ESLint
pnpm lint
# or
npm run lint
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AuthModal.jsx
│   ├── layout.jsx
│   ├── LoginModal.jsx
│   ├── navbar.jsx
│   ├── ProtectedRoute.jsx
│   └── sidebar.jsx
├── contexts/           # React contexts
│   └── AuthContext.jsx
├── pages/              # Page components
│   ├── ChatAgent/      # AI chat interface
│   ├── Enterprise/     # Enterprise features
│   ├── Home/          # Dashboard
│   ├── Policy/        # Policy management
│   ├── Projects/      # Project management
│   ├── Reports/       # Reporting
│   ├── Templates/     # Template system
│   └── UserManagement/ # User management
├── services/          # API services
│   ├── authService.js
│   ├── chatAgentService.js
│   └── templateService.js
└── constants/         # Application constants
    ├── dashboardData.js
    ├── enterpriseQuestions.js
    ├── questions.js
    └── templates.js
```

## 🔧 Configuration

### Development Server
The development server runs on `http://localhost:5173` by default.

### API Configuration
The frontend connects to:
- **Backend API**: `http://localhost:3001` (Express.js)
- **Agent API**: `http://localhost:8000` (FastAPI)

## 🎨 Styling

This project uses:
- **Tailwind CSS**: For utility-first styling
- **Material-UI**: For component library
- **Emotion**: For styled components

## 🔐 Authentication

The application includes a complete authentication system with:
- User registration and login
- Role-based permissions (Admin/User)
- JWT token management
- Protected routes

### Available Roles
- **Admin**: Full access to all features
- **User**: Limited access to templates and responses

## 🚀 Running the Application

1. **Start the frontend only**:
   ```bash
   pnpm dev
   ```

2. **Start with backend** (from project root):
   ```bash
   # Using the provided script
   ./run-all-dev.sh
   
   # Or manually
   cd Backend && npm run dev &
   cd governance-ai && pnpm dev
   ```

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**:
   ```bash
   # Kill process on port 5173
   npx kill-port 5173
   ```

2. **Dependencies issues**:
   ```bash
   # Clear cache and reinstall
   pnpm store prune
   pnpm install
   ```

3. **Build errors**:
   ```bash
   # Clear build cache
   pnpm build --force
   ```

## 📝 Development Notes

- The application uses React Router for navigation
- State management is handled through React Context
- API calls are centralized in the `services` directory
- Components are organized by feature/domain

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

This project is part of the Governance AI system.
