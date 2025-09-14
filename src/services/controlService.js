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
   * @param {Object} data - The payload for bulk creation.
   */
  async storeControls(data) {
    try {
      const response = await api.post('/', data);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to store controls');
    }
  }

  /**
   * Get all control assessments with pagination.
   * @param {Object} params - Optional parameters like { page, limit }.
   */
  async getAllControls(params = {}) {
    try {
      const queryParams = new URLSearchParams();
      if (params.page) queryParams.append('page', params.page);
      if (params.limit) queryParams.append('limit', params.limit);

      const response = await api.get(`/?${queryParams.toString()}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to fetch control assessments');
    }
  }

  // =========================================================================
  // NEW METHOD: Get controls by high-level system type (AI or Cybersecurity)
  // =========================================================================
  /**
   * Get controls by high-level system type with pagination.
   * @param {string} type - The system type, either 'AI' or 'Cybersecurity'.
   * @param {Object} params - Optional parameters like { page, limit }.
   */
  async getControlsBySystemType(type, params = {}) {
    try {
      if (!type) {
        throw new Error("System type ('AI' or 'Cybersecurity') is required.");
      }
      const queryParams = new URLSearchParams();

      queryParams.append('type', type);
      if (params.page) queryParams.append('page', params.page);
      if (params.limit) queryParams.append('limit', params.limit);

      // The baseURL is already '/controls', so we just call the sub-path
      const response = await api.get(`/type?${queryParams.toString()}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to fetch controls by system type');
    }
  }


  /**
   * Update a control by its unique ID.
   * @param {string} id - The MongoDB _id of the control.
   * @param {Object} updateData - The fields to update.
   */
  async updateControl(id, updateData) {
    try {
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
      const response = await api.delete(`/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to delete control');
    }
  }
}

export default new ControlAssessmentService();