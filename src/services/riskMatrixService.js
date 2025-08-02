import axios from 'axios';
import { DEFAULT_PROJECT_ID } from '../constants/projectDefaults';
import { getExpressApiUrl } from '@/config/env';

// Create axios instance
const api = axios.create({
  baseURL: getExpressApiUrl(''),
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
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
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

class RiskMatrixService {
  // Get all risk matrix results with optional filtering and pagination
  async getAllRiskMatrixResults(params = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      if (params.page) queryParams.append('page', params.page);
      if (params.limit) queryParams.append('limit', params.limit);
      if (params.sortBy) queryParams.append('sortBy', params.sortBy);
      if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);
      if (params.search) queryParams.append('search', params.search);
      if (params.projectId) queryParams.append('projectId', params.projectId);
      
      const response = await api.get(`/risk-matrix-results?${queryParams.toString()}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to fetch risk matrix results');
    }
  }

  // Get all risk matrix results for a project
  async getRiskMatrixResults(projectId = DEFAULT_PROJECT_ID) {
    try {
      const response = await api.get(`/risk-matrix-results/project/${projectId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to fetch risk matrix results');
    }
  }

  // Get risk matrix result by ID
  async getRiskMatrixResult(id) {
    try {
      const response = await api.get(`/risk-matrix-results/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to fetch risk matrix result');
    }
  }

  // Get risk matrix result by session ID
  async getRiskMatrixResultBySession(sessionId) {
    try {
      const response = await api.get(`/risk-matrix-results/session/${sessionId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to fetch risk matrix result');
    }
  }

  // Create new risk matrix result
  async createRiskMatrixResult(data) {
    try {
      const response = await api.post('/risk-matrix-results', data);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to create risk matrix result');
    }
  }

  // Update risk matrix result
  async updateRiskMatrixResult(id, data) {
    try {
      const response = await api.put(`/risk-matrix-results/${id}`, data);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to update risk matrix result');
    }
  }

  // Delete risk matrix result (admin only)
  async deleteRiskMatrixResult(id) {
    try {
      const response = await api.delete(`/risk-matrix-results/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to delete risk matrix result');
    }
  }

  // Get risk summary statistics
  async getRiskSummaryStats(params = {}) {
    try {
      const queryParams = new URLSearchParams();
      if (params.projectId) queryParams.append('projectId', params.projectId);
      
      const response = await api.get(`/risk-matrix-results/stats/summary?${queryParams.toString()}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to fetch risk summary statistics');
    }
  }
}

export default new RiskMatrixService(); 