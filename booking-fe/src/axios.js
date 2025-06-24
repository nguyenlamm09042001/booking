import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true,
  headers: {
    Accept: 'application/json',
  },
});

// Interceptor để tự động gắn XSRF token từ cookie vào header
api.interceptors.request.use((config) => {
  const xsrfToken = Cookies.get('XSRF-TOKEN');
  if (xsrfToken) {
    config.headers['X-XSRF-TOKEN'] = decodeURIComponent(xsrfToken);
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Interceptor xử lý lỗi (tùy chọn)
api.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error);
  }
);

export default api;
