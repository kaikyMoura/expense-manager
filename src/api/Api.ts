import axios from "axios";
import Cookie from 'js-cookie';

const api = axios.create({
  baseURL: 'http://localhost:8089',
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use(config => {
  const token = Cookie.get('Token');
  console.log(token)
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default api;