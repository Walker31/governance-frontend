# Environment Configuration

This document explains how to set up and use environment variables in the AI Governance frontend application.

## Environment Files

The application uses the following environment files:

- `.env` - Base environment variables (shared across all environments)
- `.env.development` - Development-specific variables
- `.env.production` - Production-specific variables

## Backend URL Configuration

The backend URL is configured using the `VITE_BACKEND_URL` environment variable.

### Default Configuration

```bash
# .env
VITE_BACKEND_URL=http://localhost:8000
VITE_APP_NAME=AI Governance
VITE_APP_VERSION=1.0.0
```

### Development Environment

```bash
# .env.development
VITE_BACKEND_URL=http://localhost:8000
VITE_APP_NAME=AI Governance (Dev)
```

### Production Environment

```bash
# .env.production
VITE_BACKEND_URL=https://your-production-backend-url.com
VITE_APP_NAME=AI Governance
```

## Usage in Components

### Import the configuration

```javascript
import { BACKEND_URL, config, getApiUrl } from '@/config/env';
```

### Access backend URL

```javascript
// Direct access to backend URL
const backendUrl = BACKEND_URL;

// Using the config object
const backendUrl = config.BACKEND_URL;

// Get full API URL for specific endpoint
const apiUrl = getApiUrl('/api/users');
// Result: http://localhost:8000/api/users
```

### Example API call

```javascript
import { getApiUrl } from '@/config/env';
import axios from 'axios';

const fetchUsers = async () => {
  try {
    const response = await axios.get(getApiUrl('/api/users'));
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};
```

## Environment Variables

### Available Variables

- `VITE_BACKEND_URL` - Backend API URL
- `VITE_APP_NAME` - Application name
- `VITE_APP_VERSION` - Application version

### Adding New Variables

1. Add the variable to the appropriate `.env` file:
   ```bash
   VITE_NEW_VARIABLE=value
   ```

2. Update the config in `src/config/env.js`:
   ```javascript
   export const config = {
     // ... existing config
     NEW_VARIABLE: import.meta.env.VITE_NEW_VARIABLE || 'default_value',
   };
   ```

3. Export the variable for convenience:
   ```javascript
   export const NEW_VARIABLE = config.NEW_VARIABLE;
   ```

## Development vs Production

The application automatically detects the environment:

- **Development**: Uses `.env.development` variables
- **Production**: Uses `.env.production` variables
- **Base**: `.env` variables are always loaded

## Running the Application

```bash
# Development
npm run dev

# Production build
npm run build

# Development build
npm run build:dev
```

## Security Notes

- Environment variables prefixed with `VITE_` are exposed to the client
- Never include sensitive information (API keys, passwords) in client-side environment variables
- Use server-side environment variables for sensitive data

## Troubleshooting

1. **Environment variables not loading**: Restart the development server
2. **Wrong backend URL**: Check the appropriate `.env` file for your environment
3. **Build issues**: Ensure all environment variables are properly defined in production builds 