const API_BASE_URL = 'http://localhost:3001/api';

export const apiClient = {
  // Get list of supported models
  getModels: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/models`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching models:', error);
      throw error;
    }
  },

  // Optimize a prompt
  optimizePrompt: async (requestData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/optimize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error optimizing prompt:', error);
      throw error;
    }
  },
};