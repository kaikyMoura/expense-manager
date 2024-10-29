import axios from "axios";
import Cookie from 'js-cookie';
import router from "next/router";
import { checkUserAuthentication } from "./services/userService";

const api = axios.create({
  // baseURL: 'http://localhost:8089',
  baseURL: 'https://backend-expensemanager-315652357407.us-central1.run.app',
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use(
  async (config) => {
    const token = Cookie.get('Token');
    config.headers['Authorization'] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;