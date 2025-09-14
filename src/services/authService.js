import axios from 'axios';
import { getBackendUrl } from '@/config/env';

// Create axios instance
const api = axios.create({
  baseURL: getBackendUrl(''),
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, clear storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

class AuthService {
  // Register new user
  async register(userData) {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  }

  // Login user
  async login(credentials) {
    try {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  }

  // In AuthService.js

  async loginWithGoogle(idToken) {
    try {
      const response = await api.post("/auth/google", { token: idToken });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Google login failed");
    }
  }


  // Login with token (used for magic links or silent login)
  async getProfileWithToken(token) {
    try {
      const response = await api.get('/auth/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get profile');
    }
  }

  // Get current user profile
  async getProfile() {
    try {
      const response = await api.get('/auth/profile');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get profile');
    }
  }

  // Update user profile
  async updateProfile(profileData) {
    try {
      const response = await api.put('/auth/profile', profileData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update profile');
    }
  }

  // Change password
  async changePassword(passwordData) {
    try {
      const response = await api.put('/auth/change-password', passwordData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to change password');
    }
  }

  // Get all users (admin only)
  async getUsers() {
    try {
      const response = await api.get('/auth/users');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get users');
    }
  }

  // Update user status (admin only)
  async updateUserStatus(userId, isActive) {
    try {
      const response = await api.put(`/auth/users/${userId}/status`, { isActive });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update user status');
    }
  }

  // Update user role (admin only)
  async updateUserRole(userId, role) {
    try {
      const response = await api.put(`/auth/users/${userId}/role`, { role });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update user role');
    }
  }
}

export default new AuthService();
