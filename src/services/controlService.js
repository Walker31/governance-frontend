import axios from 'axios';
import { getBackendUrl } from '@/config/env';

// Axios instance with baseURL and JSON headers
const api = axios.create({
  // The base path for all control-related requests is now '/controls'
  baseURL: getBackendUrl('/controls'), 
  headers: { 'Content-Type': 'application/json' },
});

// Add auth token to requests (no changes needed here)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle 401 globally on responses (no changes needed here)
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
  /**
   * Store multiple controls after an agent response.
   * @param {Object} data - The payload, typically { parsedControls: [...] }.
   */
  async storeControls(data) {
    try {
      // Endpoint is now POST /controls/
      const response = await api.post('/', data);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to store controls');
    }
  }

  /**
   * Get all control assessments.
   */
  async getAllControls() {
    try {
      // Endpoint is now GET /controls/
      const response = await api.get('/');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to fetch control assessments');
    }
  }

  /**
   * Update a control by its unique ID.
   * @param {string} id - The MongoDB _id of the control.
   * @param {Object} updateData - The fields to update.
   */
  async updateControl(id, updateData) {
    try {
      // Endpoint is now PUT /controls/:id
      const response = await api.put(`/${id}`, updateData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to update control');
    }
  }

  /**
   * Soft delete a control by its unique ID.
   * @param {string} id - The MongoDB _id of the control.
   */
  async deleteControl(id) {
    try {
      // Endpoint is now DELETE /controls/:id
      const response = await api.delete(`/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to delete control');
    }
  }

  // NOTE: The following methods have been removed as their corresponding
  // backend endpoints no longer exist in the new, simplified API structure:
  // - getControlsByAssessment
  // - getControlsBySession
  // - getControlsByProject
}

export default new ControlAssessmentService();