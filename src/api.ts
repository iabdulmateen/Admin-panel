
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:4000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Automatically attach JWT token to every API request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('userToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
