// Environment configuration
export const config = {
  // Backend server URL (Express.js - auth, templates, risk matrix, etc.)
  BACKEND_URL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001',
  
  // Agent API URL (AI agent functionality)
  AGENT_URL: import.meta.env.VITE_AGENT_URL || 'http://localhost:8000',
  
  // App configuration
  APP_NAME: import.meta.env.VITE_APP_NAME || 'AI Governance',
  APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
  
  // Environment detection
  IS_DEVELOPMENT: import.meta.env.DEV,
  IS_PRODUCTION: import.meta.env.PROD,
  
  // Helper function to get full backend API URL
  getBackendUrl: (endpoint) => {
    const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';
    return `${baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  },
  
  // Helper function to get full agent API URL
  getAgentUrl: (endpoint) => {
    const baseUrl = import.meta.env.VITE_AGENT_URL || 'http://localhost:8000';
    return `${baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  }
};

// Export individual variables for convenience
export const BACKEND_URL = config.BACKEND_URL;
export const AGENT_URL = config.AGENT_URL;
export const getBackendUrl = config.getBackendUrl;
export const getAgentUrl = config.getAgentUrl;