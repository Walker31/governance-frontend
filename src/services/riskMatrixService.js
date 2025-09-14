import axios from "axios";
import { getBackendUrl } from "@/config/env";

// Create axios instance
const api = axios.create({
  baseURL: getBackendUrl(""),
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
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
      // Token expired or invalid, clear storage and reload
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

class RiskMatrixService {
  // Get all risks with optional filtering and pagination
  async getAllRisks(params = {}) {
    try {
      const queryParams = new URLSearchParams();

      if (params.page) queryParams.append("page", params.page);
      if (params.limit) queryParams.append("limit", params.limit);
      if (params.sortBy) queryParams.append("sortBy", params.sortBy);
      if (params.sortOrder) queryParams.append("sortOrder", params.sortOrder);
      if (params.search) queryParams.append("search", params.search);
      if (params.projectId) queryParams.append("projectId", params.projectId);
      if (params.sessionId) queryParams.append("sessionId", params.sessionId);

      const response = await api.get(`/risks?${queryParams.toString()}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || "Failed to fetch risks");
    }
  }

  // Get risks by high-level system type (AI or Cybersecurity)
  async getRisksBySystemType(type, params = {}) {
    try {
      if (!type) {
        throw new Error("System type ('AI' or 'Cybersecurity') is required.");
      }
      const queryParams = new URLSearchParams();

      queryParams.append("type", type);

      if (params.page) queryParams.append("page", params.page);
      if (params.limit) queryParams.append("limit", params.limit);
      if (params.sortBy) queryParams.append("sortBy", params.sortBy);
      if (params.sortOrder) queryParams.append("sortOrder", params.sortOrder);

      // Corrected endpoint to match backend
      const response = await api.get(
        `/risks/type?${queryParams.toString()}`
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.error || "Failed to fetch risks by system type"
      );
    }
  }

  // Get risks for a specific project
  async getRisksByProject(projectId, params = {}) {
    try {
      const queryParams = new URLSearchParams();

      if (params.page) queryParams.append("page", params.page);
      if (params.limit) queryParams.append("limit", params.limit);
      if (params.severity) queryParams.append("severity", params.severity);

      const response = await api.get(
        `/risks/project/${projectId}?${queryParams.toString()}`
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.error || "Failed to fetch project risks"
      );
    }
  }

  // Get risks for a specific session
  async getRisksBySession(sessionId) {
    try {
      const response = await api.get(`/risks/session/${sessionId}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.error || "Failed to fetch session risks"
      );
    }
  }

  // =======================================================================
  // NEW METHOD: Add a single new risk
  // =======================================================================
  async addRisk(riskData) {
    try {
      // Assumes a backend endpoint like POST /risks for creating a single item
      const response = await api.post("/risks", riskData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || "Failed to add risk");
    }
  }

  // Store risks from agent response (bulk creation)
  async storeRisks(data) {
    try {
      const response = await api.post("/risks/bulk", data);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || "Failed to store risks");
    }
  }

  // Update a risk
  async updateRisk(riskId, updateData) {
    try {
      const response = await api.put(`/risks/${riskId}`, updateData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || "Failed to update risk");
    }
  }

  // Delete a risk
  async deleteRisk(riskId) {
    try {
      const response = await api.delete(`/risks/${riskId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || "Failed to delete risk");
    }
  }

  // Get risk statistics
  async getRiskStatistics(projectId = null) {
    try {
      const queryParams = new URLSearchParams();
      if (projectId) queryParams.append("projectId", projectId);

      const response = await api.get(
        `/risks/stats/summary?${queryParams.toString()}`
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.error || "Failed to fetch risk statistics"
      );
    }
  }

  // Process questionnaire and generate assessment
  async processQuestionnaire(answers) {
    try {
      const response = await api.post(
        "/agent/risk-control/process_questionnaire",
        { answers }
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.error || "Failed to process questionnaire"
      );
    }
  }
}

export default new RiskMatrixService();
