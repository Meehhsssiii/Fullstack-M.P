import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/tasks';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Get all tasks, optionally filtered by status and/or priority
export const getTasks = (status, priority) => {
  const params = {};
  if (status) params.status = status;
  if (priority) params.priority = priority;
  return api.get('', { params });
};

export const getTaskById = (id) => api.get(`/${id}`);

export const createTask = (task) => api.post('', task);

export const updateTask = (id, task) => api.put(`/${id}`, task);

export const updateTaskStatus = (id, status) =>
  api.patch(`/${id}/status`, { status });

export const deleteTask = (id) => api.delete(`/${id}`);

export const searchTasks = (title) => api.get('/search', { params: { title } });

export const getSummary = () => api.get('/summary');

export default api;
