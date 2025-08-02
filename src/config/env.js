// Environment configuration
export const config = {
  // Express API URL (auth, templates, risk matrix, etc.)
  EXPRESS_API_URL: import.meta.env.VITE_EXPRESS_API_URL || 'http://localhost:3001',
  
  // Agent API URL (chat, AI agent functionality)
  AGENT_API_URL: import.meta.env.VITE_AGENT_API_URL || 'http://localhost:8000',
  
  // Legacy backend URL for backward compatibility
  BACKEND_URL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000',
  
  // App configuration
  APP_NAME: import.meta.env.VITE_APP_NAME || 'AI Governance',
  APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
  
  // Environment detection
  IS_DEVELOPMENT: import.meta.env.DEV,
  IS_PRODUCTION: import.meta.env.PROD,
  
  // Helper function to get full Express API URL
  getExpressApiUrl: (endpoint) => {
    const baseUrl = import.meta.env.VITE_EXPRESS_API_URL || 'http://localhost:3001';
    return `${baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  },
  
  // Helper function to get full Agent API URL
  getAgentApiUrl: (endpoint) => {
    const baseUrl = import.meta.env.VITE_AGENT_API_URL || 'http://localhost:8000';
    return `${baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  },
  
  // Legacy helper function for backward compatibility
  getApiUrl: (endpoint) => {
    const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';
    return `${baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  }
};

// Export individual variables for convenience
export const BACKEND_URL = config.BACKEND_URL;
export const EXPRESS_API_URL = config.EXPRESS_API_URL;
export const AGENT_API_URL = config.AGENT_API_URL;
export const getExpressApiUrl = config.getExpressApiUrl;
export const getAgentApiUrl = config.getAgentApiUrl;
export const getApiUrl = config.getApiUrl;