import axios from 'axios';
import { getBackendUrl } from '@/config/env';

// Axios instance with baseURL and JSON headers
const api = axios.create({
  baseURL: getBackendUrl(''),
  headers: { 'Content-Type': 'application/json' },
});

// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle 401 globally on responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

class ControlAssessmentService {
  // Store multiple controls after agent response
  async storeControls(data) {
    try {
      const response = await api.post('/controls/controls', data);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to store controls');
    }
  }

  // Get controls by risk assessment ID
  async getControlsByAssessment(riskAssessmentId) {
    try {
      const response = await api.get(`/controls/controls/assessment/${riskAssessmentId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to fetch assessment controls');
    }
  }

  // Get controls by session ID
  async getControlsBySession(sessionId) {
    try {
      const response = await api.get(`/controls/controls/session/${sessionId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to fetch session controls');
    }
  }

  async getControls(){
    try{
      const response = await api.get('/controls/all');
      return response.data;
    } catch (error){
      throw new Error(error.response?.data?.error || 'Failed to fetch control assessments');
    }
  }

  // Get controls by project with pagination and optional status filter
  async getControlsByProject(projectId, params = {}) {
    try {
      const queryParams = new URLSearchParams();
      if (params.page) queryParams.append('page', params.page);
      if (params.limit) queryParams.append('limit', params.limit);
      if (params.status) queryParams.append('status', params.status);

      const response = await api.get(`/controls/controls/project/${projectId}?${queryParams.toString()}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to fetch project controls');
    }
  }

  // Update a control by controlId
  async updateControl(controlId, updateData) {
    try {
      const response = await api.put(`/controls/controls/${controlId}`, updateData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to update control');
    }
  }

  // Soft delete a control by controlId
  async deleteControl(controlId) {
    try {
      const response = await api.delete(`/controls/controls/${controlId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to delete control');
    }
  }
}

export default new ControlAssessmentService();
