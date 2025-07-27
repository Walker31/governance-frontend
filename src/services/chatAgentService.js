const CHAT_AGENT_API_URL = 'http://localhost:8000/agent/chat';

class ChatAgentService {
  async startChat() {
    try {
      const response = await fetch(CHAT_AGENT_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session_id: null,
          answer: null
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error starting chat:', error);
      throw error;
    }
  }

  async sendMessage(sessionId, answer) {
    try {
      const response = await fetch(CHAT_AGENT_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session_id: sessionId,
          answer: answer
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  async getRiskAnalysis(data) {
    try {
      const response = await fetch('http://localhost:8000/agent/risk-matrix/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error getting risk analysis:', error);
      throw error;
    }
  }
}

export default new ChatAgentService(); 