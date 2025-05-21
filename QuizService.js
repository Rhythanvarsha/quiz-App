import api from '../config/api';

const QuizService = {
  findByCode: async (code) => {
    try {
      const response = await api.get(`/api/v1/quizzes/code/${code}`);
      return response.data;
    } catch (err) {
      console.error('Error finding quiz by code:', err);
      if (err.response && err.response.status === 404) {
        throw new Error('Quiz not found. Please check the code and try again.');
      }
      throw new Error('Failed to find quiz. Please try again.');
    }
  },
  submit: async (request) => {
    const user_id = sessionStorage.getItem("quizden-user-id");
    const authToken = sessionStorage.getItem("quizden-authToken");
    
    if (!user_id || !authToken) {
      throw new Error('User not authenticated. Please log in again.');
    }

    try {
      const response = await api.post(`/api/v1/quizzes/create/${user_id}`, request, {
        headers: {
          "auth-token": authToken,
        },
      });
      return response.data;
    } catch (err) {
      console.error('Error creating quiz:', err);
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        throw new Error(err.response.data.message || 'Failed to create quiz');
      } else if (err.request) {
        // The request was made but no response was received
        throw new Error('No response from server. Please check your internet connection.');
      } else {
        // Something happened in setting up the request
        throw new Error('Error creating quiz. Please try again.');
      }
    }
  },
  findByUser: async (user_id) => {
    const authToken = sessionStorage.getItem("quizden-authToken");
    try {
      const response = await api.get(`/api/v1/quizzes/quizzer/${user_id}`, {
        headers: {
          "auth-token": authToken,
        },
      });
      return response.data;
    } catch (err) {
      console.error('Error finding quizzes:', err);
      throw err;
    }
  },
  findById: async (quiz_id) => {
    const authToken = sessionStorage.getItem("quizden-authToken");
    try {
      const response = await api.get(`/api/v1/quizzes/${quiz_id}`, {
        headers: {
          "auth-token": authToken,
        },
      });
      return response.data;
    } catch (err) {
      console.error('Error finding quiz:', err);
      throw err;
    }
  },
  submitAnswer: async (request) => {
    const user_id = sessionStorage.getItem("quizden-user-id");
    const authToken = sessionStorage.getItem("quizden-authToken");
    const uri = "/api/v1/quizzes/submit/" + user_id;
    try {
      const response = await api.post(uri, request, {
        headers: {
          "auth-token": authToken,
        },
      });
      return response.data;
    } catch (err) {
      console.error('Error submitting answer:', err);
      throw err;
    }
  },
  submitPublicAnswer: async (code, request) => {
    try {
      const response = await api.post(`/api/v1/quizzes/submit/${code}`, request);
      return response.data;
    } catch (err) {
      console.error('Error submitting public quiz answer:', err);
      if (err.response) {
        throw new Error(err.response.data.message || 'Failed to submit answers');
      } else if (err.request) {
        throw new Error('No response from server. Please check your internet connection.');
      } else {
        throw new Error('Error submitting answers. Please try again.');
      }
    }
  },
};

export default QuizService;
