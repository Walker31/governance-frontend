import axios from 'axios';
/**
 * Fetches all projects from the backend.
 * @param {string} token The authentication token.
 * @returns {Promise<Array>} A promise that resolves to an array of projects.
 */
export const getProjects = async (token) => {
  try {
    const response = await axios.get('http://localhost:3001/projects/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};