import axios from 'axios';

const API = axios.create({
  // In production (single-service build), leave baseURL empty so requests
  // go to the same origin serving the app (e.g. https://your-app.onrender.com/api/...).
  // In local dev (frontend-only, npm run dev), default to the standalone backend dev server.
  baseURL: import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '' : 'http://localhost:5000'),
  headers: {
    'Content-Type': 'application/json',
  },
});

API.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
