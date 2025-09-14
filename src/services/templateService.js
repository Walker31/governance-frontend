// Template API Service
// This service handles all template-related API calls

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

class TemplateService {
  // Get all templates
  async getTemplates() {
    try {
      const response = await api.get('/templates');
      return response.data;
    } catch (error) {
      console.error('=== TEMPLATE SERVICE ERROR ===');
      console.error('API call failed:', error);
      console.error('Error response:', error.response);
      console.error('Error status:', error.response?.status);
      console.error('Error data:', error.response?.data);
      throw new Error(error.response?.data?.error || 'Failed to fetch templates');
    }
  }

  // Get template by ID
  async getTemplate(id) {
    try {
      const response = await api.get(`/templates/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to fetch template');
    }
  }

  // Create new template
  async createTemplate(templateData) {
    try {
      const response = await api.post('/templates', templateData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to create template');
    }
  }

  // Update template
  async updateTemplate(id, templateData) {
    try {
      const response = await api.put(`/templates/${id}`, templateData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to update template');
    }
  }

  // Delete template
  async deleteTemplate(id) {
    try {
      const response = await api.delete(`/templates/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to delete template');
    }
  }

  // Get all responses (admin only)
  async getResponses() {
    try {
      const response = await api.get('/template-responses');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to fetch responses');
    }
  }

  // Get responses by template ID
  async getResponsesByTemplate(templateId) {
    try {
      const response = await api.get(`/template-responses/template/${templateId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to fetch template responses');
    }
  }

  // Submit template response
  async submitResponse(responseData) {
    try {
      const response = await api.post('/template-responses', responseData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to submit response');
    }
  }

  // Get response by ID
  async getResponse(id) {
    try {
      const response = await api.get(`/template-responses/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to fetch response');
    }
  }

  // Update response status (admin only)
  async updateResponseStatus(id, status) {
    try {
      const response = await api.patch(`/template-responses/${id}/status`, { status });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to update response status');
    }
  }

  // Delete response (admin only)
  async deleteResponse(id) {
    try {
      const response = await api.delete(`/template-responses/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to delete response');
    }
  }
}

export default new TemplateService(); 