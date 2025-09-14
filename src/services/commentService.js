import axios from "axios";
import { getBackendUrl } from "@/config/env";

// Base URL for comments API
const API_URL = getBackendUrl("/comments");

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

/**
 * Fetch comment data for a given project (returns an array).
 * @param {string} projectId
 * @returns {Promise<object[]>}
 */
export const getComments = async (projectId) => {
  if (!projectId) {
    throw new Error("projectId is required");
  }

  const token = getAuthToken();
  if (!token) {
    throw new Error("Authentication token not found. Please log in again.");
  }

  try {
    const { data } = await axios.get(`${API_URL}/${projectId}`, {
      headers: getAuthHeaders(),
    });

    // Handle the new API response format
    if (data.success && Array.isArray(data.data)) {
      return data.data;
    } else if (Array.isArray(data)) {
      // Fallback for old API format
      return data;
    } else {
      console.warn('Unexpected API response format:', data);
      return [];
    }
  } catch (error) {
    console.error(`Error fetching comments for project ${projectId}:`, error);
    
    if (error.response?.status === 401) {
      throw new Error("Authentication failed. Please log in again.");
    } else if (error.response?.status === 404) {
      return []; // No comments found
    } else {
      throw new Error(`Failed to fetch comments: ${error.response?.data?.message || error.message}`);
    }
  }
};

/**
 * Save a single comment with optional file attachment
 * @param {string} projectId
 * @param {string} text
 * @param {File} file
 * @returns {Promise<object>}
 */
export const saveComment = async (projectId, text, file) => {
  if (!projectId) {
    throw new Error("projectId is required");
  }
  if (!text || text.trim().length === 0) {
    throw new Error("text is required");
  }

  const token = getAuthToken();
  if (!token) {
    throw new Error("Authentication token not found. Please log in again.");
  }

  try {
    // Create FormData for file upload
    const formData = new FormData();
    formData.append('projectId', projectId);
    formData.append('text', text.trim());
    
    if (file) {
      formData.append('attachment', file);
    }

    const { data } = await axios.post(
      `${API_URL}/`,
      formData,
      { 
        headers: {
          ...getAuthHeaders(),
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    if (data.success) {
      return data.data;
    } else {
      throw new Error(data.message || 'Failed to save comment');
    }
  } catch (error) {
    console.error(`Error saving comment for project ${projectId}:`, error);
    
    if (error.response?.status === 401) {
      throw new Error("Authentication failed. Please log in again.");
    } else if (error.response?.status === 413) {
      throw new Error("File too large. Please choose a file smaller than 10MB.");
    } else if (error.response?.status === 400 && error.response?.data?.message?.includes('Only PDF files')) {
      throw new Error("Only PDF files are allowed as attachments.");
    } else {
      throw new Error(`Failed to save comment: ${error.response?.data?.message || error.message}`);
    }
  }
};

/**
 * Save multiple comments in one call (no file uploads for bulk).
 * @param {string} projectId
 * @param {{text: string, attachment?: string}[]} comments
 * @returns {Promise<object>}
 */
export const saveCommentsBulk = async (projectId, comments) => {
  if (!projectId) {
    throw new Error("projectId is required");
  }
  if (!Array.isArray(comments)) {
    throw new Error("comments must be an array");
  }
  if (comments.length === 0) {
    throw new Error("comments array cannot be empty");
  }

  const token = getAuthToken();
  if (!token) {
    throw new Error("Authentication token not found. Please log in again.");
  }

  try {
    const { data } = await axios.post(
      `${API_URL}/bulk`,
      { projectId, comments },
      { headers: getAuthHeaders() }
    );

    if (data.success) {
      return data;
    } else {
      throw new Error(data.message || 'Failed to save comments');
    }
  } catch (error) {
    console.error(`Error saving comments (bulk) for project ${projectId}:`, error);
    
    if (error.response?.status === 401) {
      throw new Error("Authentication failed. Please log in again.");
    } else {
      throw new Error(`Failed to save comments: ${error.response?.data?.message || error.message}`);
    }
  }
};

/**
 * Update a comment with optional new attachment
 * @param {string} commentId
 * @param {string} text
 * @param {File} file
 * @returns {Promise<object>}
 */
export const updateComment = async (commentId, text, file) => {
  if (!commentId) {
    throw new Error("commentId is required");
  }
  if (!text || text.trim().length === 0) {
    throw new Error("text is required");
  }

  const token = getAuthToken();
  if (!token) {
    throw new Error("Authentication token not found. Please log in again.");
  }

  try {
    // Create FormData for file upload
    const formData = new FormData();
    formData.append('text', text.trim());
    
    if (file) {
      formData.append('attachment', file);
    }

    const { data } = await axios.put(
      `${API_URL}/${commentId}`,
      formData,
      { 
        headers: {
          ...getAuthHeaders(),
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    if (data.success) {
      return data.data;
    } else {
      throw new Error(data.message || 'Failed to update comment');
    }
  } catch (error) {
    console.error(`Error updating comment ${commentId}:`, error);
    
    if (error.response?.status === 401) {
      throw new Error("Authentication failed. Please log in again.");
    } else if (error.response?.status === 404) {
      throw new Error("Comment not found or you don't have permission to update it");
    } else if (error.response?.status === 413) {
      throw new Error("File too large. Please choose a file smaller than 10MB.");
    } else if (error.response?.status === 400 && error.response?.data?.message?.includes('Only PDF files')) {
      throw new Error("Only PDF files are allowed as attachments.");
    } else {
      throw new Error(`Failed to update comment: ${error.response?.data?.message || error.message}`);
    }
  }
};

/**
 * Delete a comment
 * @param {string} commentId
 * @returns {Promise<object>}
 */
export const deleteComment = async (commentId) => {
  if (!commentId) {
    throw new Error("commentId is required");
  }

  const token = getAuthToken();
  if (!token) {
    throw new Error("Authentication token not found. Please log in again.");
  }

  try {
    const { data } = await axios.delete(
      `${API_URL}/${commentId}`,
      { headers: getAuthHeaders() }
    );

    if (data.success) {
      return data;
    } else {
      throw new Error(data.message || 'Failed to delete comment');
    }
  } catch (error) {
    console.error(`Error deleting comment ${commentId}:`, error);
    
    if (error.response?.status === 401) {
      throw new Error("Authentication failed. Please log in again.");
    } else if (error.response?.status === 404) {
      throw new Error("Comment not found or you don't have permission to delete it");
    } else {
      throw new Error(`Failed to delete comment: ${error.response?.data?.message || error.message}`);
    }
  }
};
