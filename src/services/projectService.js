// services/projects.js
import axios from 'axios';
import { getBackendUrl } from '@/config/env';  // ✅ centralized env handler

// Create a reusable Axios instance with a base URL
const apiClient = axios.create({
  baseURL: getBackendUrl(""),   // ✅ consistent with other services
});

/**
 * Fetches all projects from the backend.
 * @returns {Promise<Array>} A promise that resolves to an array of projects.
 */
export const getProjects = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await apiClient.get('/projects', {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

/**
 * Fetches the details for a single project by its ID.
 * @param {string} projectId The ID of the project to fetch.
 * @param {string} token The authentication token.
 * @returns {Promise<Object>} A promise that resolves to the project object.
 */
export const getProjectDetails = async (projectId, token) => {
  try {
    const response = await apiClient.get(`/projects/${projectId}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching details for project ${projectId}:`, error);
    throw error;
  }
};

/**
 * Updates the status of a project.
 * @param {string} projectId The ID of the project to update.
 * @param {string} newStatus The new status to set.
 * @param {string} token The authentication token.
 * @returns {Promise<Object>} A promise that resolves to the updated project.
 */
export const updateProjectStatus = async (projectId, newStatus) => {
  try {
    const token = localStorage.getItem('token');
    const response = await apiClient.patch(
      `/projects/${projectId}/status`,
      { status: newStatus },
      {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating status for project ${projectId}:`, error);
    throw error;
  }
};
