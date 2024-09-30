import axios from "axios";
import Cookie from 'js-cookie';

const api = axios.create({
     //baseURL: 'https://autenticacao-spring-security-production.up.railway.app'
    baseURL: 'https://backend-expensemanager.onrender.com',
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