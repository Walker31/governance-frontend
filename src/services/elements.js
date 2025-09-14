// services/elements.js
import axios from "axios";
import { getBackendUrl } from "@/config/env";   // ✅ centralized env handling

// ✅ Normalize base URL for elements API
const API_URL = getBackendUrl("/elements");

/**
 * Fetch purpose data for a given project (returns an array).
 * @param {string} projectId
 * @param {string} token
 * @returns {Promise<object[]>}
 */
export const getPurposeData = async (projectId, token) => {
  if (!projectId) throw new Error("projectId is required");

  try {
    const { data } = await axios.get(`${API_URL}/${projectId}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return Array.isArray(data) ? data : data ? [data] : [];
  } catch (error) {
    console.error(`Error fetching purpose data for project ${projectId}:`, error);
    throw error;
  }
};

/**
 * Save multiple purpose elements in one call.
 * @param {string} projectId
 * @param {{category: string, elementName: string}[]} elements
 * @param {string} token
 * @returns {Promise<object>}
 */
export const savePurposeDataBulk = async (projectId, elements, token) => {
  if (!projectId) throw new Error("projectId is required");
  if (!Array.isArray(elements)) throw new Error("elements must be an array");

  try {
    const { data } = await axios.post(
      `${API_URL}/bulk`,
      { projectId, elements },
      { headers: token ? { Authorization: `Bearer ${token}` } : {} }
    );
    return data;
  } catch (error) {
    console.error(`Error saving purpose data (bulk) for project ${projectId}:`, error);
    throw error;
  }
};

/** (kept for compatibility) Save a single element — not used by Purpose.jsx now */
export const savePurposeData = async (projectId, category, elementName, token) => {
  if (!projectId) throw new Error("projectId is required");
  if (!category) throw new Error("category is required");
  if (!elementName) throw new Error("elementName is required");

  try {
    const { data } = await axios.post(
      `${API_URL}/`,
      { projectId, category, elementName },
      { headers: token ? { Authorization: `Bearer ${token}` } : {} }
    );
    return data;
  } catch (error) {
    console.error(`Error saving purpose data for project ${projectId}:`, error);
    throw error;
  }
};
