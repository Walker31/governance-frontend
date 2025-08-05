// Agent API Service
// This service handles all AI agent-related API calls

import axios from 'axios';
import { getAgentUrl } from '@/config/env';

// Create axios instance
const api = axios.create({
  baseURL: getAgentUrl(''),
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

class AgentService {
  // Start AI agent assessment
  async startAgentAssessment(assessmentData) {
    try {
      const response = await api.post('/agent/start-assessment', assessmentData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to start agent assessment');
    }
  }

  // Get agent assessment status
  async getAgentAssessmentStatus(sessionId) {
    try {
      const response = await api.get(`/agent/assessment-status/${sessionId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to get agent assessment status');
    }
  }

  // Get agent assessment results
  async getAgentAssessmentResults(sessionId) {
    try {
      const response = await api.get(`/agent/assessment-results/${sessionId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to get agent assessment results');
    }
  }

  // Stop agent assessment
  async stopAgentAssessment(sessionId) {
    try {
      const response = await api.post(`/agent/stop-assessment/${sessionId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to stop agent assessment');
    }
  }

  // Get agent capabilities
  async getAgentCapabilities() {
    try {
      const response = await api.get('/agent/capabilities');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to get agent capabilities');
    }
  }

  // Configure agent settings
  async configureAgent(settings) {
    try {
      const response = await api.post('/agent/configure', settings);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to configure agent');
    }
  }
}

export default new AgentService(); 