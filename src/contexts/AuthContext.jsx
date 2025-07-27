import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService.js';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const ROLES = {
  ADMIN: 'admin',
  USER: 'user'
};

export const PERMISSIONS = {
  // Template permissions
  VIEW_TEMPLATES: 'view_templates',
  CREATE_TEMPLATES: 'create_templates',
  EDIT_TEMPLATES: 'edit_templates',
  DELETE_TEMPLATES: 'delete_templates',
  
  // Response permissions
  VIEW_RESPONSES: 'view_responses',
  CREATE_RESPONSES: 'create_responses',
  EDIT_RESPONSES: 'edit_responses',
  DELETE_RESPONSES: 'delete_responses',
  
  // User management
  MANAGE_USERS: 'manage_users'
};

// Permission mapping for each rolec
const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: [
    PERMISSIONS.VIEW_TEMPLATES,
    PERMISSIONS.CREATE_TEMPLATES,
    PERMISSIONS.EDIT_TEMPLATES,
    PERMISSIONS.DELETE_TEMPLATES,
    PERMISSIONS.VIEW_RESPONSES,
    PERMISSIONS.CREATE_RESPONSES,
    PERMISSIONS.EDIT_RESPONSES,
    PERMISSIONS.DELETE_RESPONSES,
    PERMISSIONS.MANAGE_USERS
  ],
  [ROLES.USER]: [
    PERMISSIONS.VIEW_TEMPLATES,
    PERMISSIONS.CREATE_RESPONSES
  ]
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize user from localStorage and verify token on app start
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');

        if (token && savedUser) {
          // Verify token with backend
          const response = await authService.getProfile();
          const userWithPermissions = {
            ...response.data.user,
            permissions: ROLE_PERMISSIONS[response.data.user.role] || []
          };
          setUser(userWithPermissions);
          localStorage.setItem('user', JSON.stringify(userWithPermissions));
        } else if (token) {
          // Token exists but no user data, clear invalid token
          authService.logout();
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        // Clear invalid data
        authService.logout();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      const userWithPermissions = {
        ...response.data.user,
        permissions: ROLE_PERMISSIONS[response.data.user.role] || []
      };
      setUser(userWithPermissions);
      localStorage.setItem('user', JSON.stringify(userWithPermissions));
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      const userWithPermissions = {
        ...response.data.user,
        permissions: ROLE_PERMISSIONS[response.data.user.role] || []
      };
      setUser(userWithPermissions);
      localStorage.setItem('user', JSON.stringify(userWithPermissions));
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    authService.logout();
  };

  const updateProfile = async (profileData) => {
    try {
      const response = await authService.updateProfile(profileData);
      const userWithPermissions = {
        ...response.data.user,
        permissions: ROLE_PERMISSIONS[response.data.user.role] || []
      };
      setUser(userWithPermissions);
      localStorage.setItem('user', JSON.stringify(userWithPermissions));
      return { success: true };
    } catch (error) {
      console.error('Profile update error:', error);
      return { success: false, error: error.message };
    }
  };

  const changePassword = async (passwordData) => {
    try {
      await authService.changePassword(passwordData);
      return { success: true };
    } catch (error) {
      console.error('Password change error:', error);
      return { success: false, error: error.message };
    }
  };

  const hasPermission = (permission) => {
    if (!user) return false;
    return user.permissions.includes(permission);
  };

  const hasRole = (role) => {
    if (!user) return false;
    return user.role === role;
  };

  const isAdmin = () => hasRole(ROLES.ADMIN);
  const isUser = () => hasRole(ROLES.USER);

  const value = {
    user,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    hasPermission,
    hasRole,
    isAdmin,
    isUser,
    loading,
    ROLES,
    PERMISSIONS
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 