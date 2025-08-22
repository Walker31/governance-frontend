// services/thirdparty.js
import axios from "axios";
import { getBackendUrl } from "@/config/env";  // ✅ centralized env handler

// Base URL for thirdparty endpoints (slash-safe)
const API_URL = getBackendUrl("/thirdparty");

/**
 * Get all Third Parties for a given project
 * @param {string} projectId
 * @param {string} token
 * @returns {Promise<object[]>}
 */
export const getThirdParties = async (projectId, token) => {
  if (!projectId) throw new Error("projectId is required");

  try {
    const { data } = await axios.get(`${API_URL}/${projectId}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return Array.isArray(data) ? data : data ? [data] : [];
  } catch (error) {
    console.error(`Error fetching third parties for project ${projectId}:`, error);
    throw error;
  }
};

/**
 * Create a new Third Party
 * @param {object} thirdPartyData
 * @param {string} token
 * @returns {Promise<object>}
 */
export const createThirdParty = async (thirdPartyData, token) => {
  if (!thirdPartyData?.projectId) throw new Error("projectId is required");

  try {
    const { data } = await axios.post(API_URL, thirdPartyData, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return data;
  } catch (error) {
    console.error("Error creating third party:", error);
    throw error;
  }
};

/**
 * Update an existing Third Party by ID
 * @param {string} id
 * @param {object} updates
 * @param {string} token
 * @returns {Promise<object>}
 */
export const updateThirdParty = async (id, updates, token) => {
  if (!id) throw new Error("Third Party ID is required");

  try {
    const { data } = await axios.put(`${API_URL}/${id}`, updates, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return data;
  } catch (error) {
    console.error(`Error updating third party with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Delete a Third Party by ID
 * @param {string} id
 * @param {string} token
 * @returns {Promise<object>}
 */
export const deleteThirdParty = async (id, token) => {
  if (!id) throw new Error("Third Party ID is required");

  try {
    const { data } = await axios.delete(`${API_URL}/${id}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return data;
  } catch (error) {
    console.error(`Error deleting third party with ID ${id}:`, error);
    throw error;
  }
};
