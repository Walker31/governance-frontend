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

class QuestionnaireService {
  // Process questionnaire responses and generate risk analysis
  async processQuestionnaire(data) {
    try {
      const response = await api.post('/questionnaire/process', data);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to process questionnaire');
    }
  }

  // Get questionnaire processing status
  async getQuestionnaireStatus(sessionId) {
    try {
      const response = await api.get(`/questionnaire/status/${sessionId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to get questionnaire status');
    }
  }
}

export default new QuestionnaireService(); 