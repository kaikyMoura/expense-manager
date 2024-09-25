import axios from "axios";
import Cookie from 'js-cookie';

const api = axios.create({
     //baseURL: 'https://autenticacao-spring-security-production.up.railway.app'
    baseURL: 'http://localhost:8089',
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