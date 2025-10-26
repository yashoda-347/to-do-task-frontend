import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8081/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const taskService = {
  getLatestFiveTasks: async () => {
    try {
      const response = await api.get('/tasks/task/get-latest-five/');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch tasks: ${error.response?.data?.message || error.message}`);
    }
  },

  createTask: async (taskData) => {
    try {
      const response = await api.post('/tasks/task/create', {
        title: taskData.title,
        description: taskData.description
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create task: ${error.response?.data?.message || error.message}`);
    }
  },

  deleteTask: async (taskId) => {
    try {
      const response = await api.delete(`/tasks/task/delete/${taskId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to delete task: ${error.response?.data?.message || error.message}`);
    }
  }
};

export default taskService;
