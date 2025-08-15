// services/elements.js
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001/elements";

/**
 * Fetch purpose data for a given project.
 * @param {string} projectId - The ID of the project.
 * @param {string} token - The authentication token.
 * @returns {Promise<object>} - Purpose data from the API.
 */
export const getPurposeData = async (projectId, token) => {
  if (!projectId) throw new Error("projectId is required");

  try {
    const { data } = await axios.get(`${API_URL}/${projectId}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return data;
  } catch (error) {
    console.error(`Error fetching purpose data for project ${projectId}:`, error);
    throw error;
  }
};

/**
 * Save a single purpose element for a given project.
 * @param {string} projectId - The ID of the project.
 * @param {string} category - The category name.
 * @param {string} elementName - The element name.
 * @param {string} token - The authentication token.
 * @returns {Promise<object>} - Response from the API.
 */
export const savePurposeData = async (projectId, category, elementName, token) => {
  if (!projectId) throw new Error("projectId is required");
  if (!category) throw new Error("category is required");
  if (!elementName) throw new Error("elementName is required");

  try {
    const { data } = await axios.post(
      API_URL,
      { projectId, category, elementName },
      { headers: token ? { Authorization: `Bearer ${token}` } : {} }
    );
    return data;
  } catch (error) {
    console.error(`Error saving purpose data for project ${projectId}:`, error);
    throw error;
  }
};
