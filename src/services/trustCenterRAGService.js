import { getAgentUrl } from '@/config/env';

class TrustCenterRAGService {
  /**
   * Triggers an incremental sync with the GCS bucket configured on the server.
   * @returns {Promise<Object>} Sync response
   */
  async syncDocuments() {
    try {
      // CHANGED: Endpoint is now /sync-gcs
      const response = await fetch(getAgentUrl('/agent/rag/sync-gcs'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // CHANGED: No request body is needed as the bucket is configured on the server
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error syncing Trust Center documents:', error);
      throw error;
    }
  }

  /**
   * Query the loaded documents using RAG.
   * @param {string} question - User question
   * @param {string} mode - The query mode ('hybrid', 'rag', or 'general')
   * @returns {Promise<Object>} Query response with answer and sources
   */
  async queryDocuments(question, mode = 'hybrid') {
    try {
      const response = await fetch(getAgentUrl('/agent/rag/query'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // CHANGED: API now expects 'mode' instead of 'top_k'
        body: JSON.stringify({
          question: question,
          mode: mode,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error querying documents:', error);
      throw error;
    }
  }

  /**
   * Get the current status of the RAG service.
   * @returns {Promise<Object>} Status information
   */
  async getStatus() {
    try {
      // UNCHANGED: This endpoint is correct
      const response = await fetch(getAgentUrl('/agent/rag/status'), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error getting RAG status:', error);
      throw error;
    }
  }

  /**
   * Reset the RAG index on the server.
   * @returns {Promise<Object>} Reset response
   */
  async resetIndex() {
    try {
      // CHANGED: Endpoint is now /reset
      const response = await fetch(getAgentUrl('/agent/rag/reset'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error resetting index:', error);
      throw error;
    }
  }

  /**
   * Enhanced query with fallback to simulated responses.
   * @param {string} question - User question
   * @param {string} mode - The query mode
   * @returns {Promise<Object>} Enhanced response with fallback
   */
  async queryWithFallback(question, mode = 'hybrid') {
    try {
      // Try RAG service first
      const ragResponse = await this.queryDocuments(question, mode);
      
      return {
        ...ragResponse,
        source: 'rag',
        success: true,
      };
    } catch (error) {
      console.warn('RAG service unavailable, using fallback response', error);
      
      // Fallback to simulated responses
      const fallbackResponse = this.getSimulatedResponse(question);
      
      return {
        answer: fallbackResponse,
        sources: ['Simulated Response'],
        contexts: [fallbackResponse],
        source: 'fallback',
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Get simulated response for fallback.
   * @param {string} question - User question
   * @returns {string} Simulated response
   */
  getSimulatedResponse(question) {
    // UNCHANGED: This fallback logic is still valid
    const lowerMessage = question.toLowerCase();
    
    if (lowerMessage.includes("gdpr") || lowerMessage.includes("privacy")) {
      return "I can help you with GDPR compliance. Our Privacy Policy is regularly updated and available in the Trust Center Documents. We process data in accordance with EU regulations and provide easy-to-use data subject rights management.";
    }
    
    if (lowerMessage.includes("security") || lowerMessage.includes("certificate")) {
      return "Our security certifications include ISO 27001, SOC 2 Type II, and PCI DSS compliance. These certificates are regularly audited and updated. You can find the latest versions in our Certifications section.";
    }

    // ... (rest of the simulated responses)
    return "I understand you're looking for information about our trust and compliance practices. Could you be more specific? I can help with policies, certifications, audit reports, or compliance questions.";
  }

  /**
   * Initialize Trust Center by ensuring documents are loaded.
   * @returns {Promise<Object>} Initialization result
   */
  async initializeTrustCenter() {
    try {
      // Check if the index already has documents
      const status = await this.getStatus();
      
      if (status && status.indexed_file_count > 0) {
        return {
          success: true,
          message: `Trust Center already initialized with ${status.indexed_file_count} documents`,
          ...status,
        };
      }

      // If not, trigger a sync
      const result = await this.syncDocuments();
      
      return {
        success: true,
        message: 'Trust Center initialized successfully',
        ...result,
      };
    } catch (error) {
      console.warn('Failed to initialize Trust Center with RAG:', error);
      
      return {
        success: false,
        message: 'Trust Center running in fallback mode',
        error: error.message,
        fallback: true,
      };
    }
  }
}

export default new TrustCenterRAGService();