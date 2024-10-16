import axios from "axios";
import Cookie from 'js-cookie';

const api = axios.create({
  baseURL: 'https://backend-expensemanager-315652357407.us-central1.run.app',
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use(config => {
  const token = Cookie.get('Token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default api;