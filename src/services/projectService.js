import axios from 'axios';

// Create a reusable Axios instance with a base URL
const apiClient = axios.create({
  baseURL: 'http://localhost:3001',
});

/**
 * Fetches all projects from the backend.
 * @param {string} token The authentication token.
 * @returns {Promise<Array>} A promise that resolves to an array of projects.
 */
export const getProjects = async (token) => {
  try {
    // Use the apiClient instance and relative path
    const response = await apiClient.get('/projects', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
    // Use the apiClient instance and a dynamic path
    const response = await apiClient.get(`/projects/${projectId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching details for project ${projectId}:`, error);
    throw error;
  }
};