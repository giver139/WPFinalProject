import axios from 'axios';

export const api = axios.create({
  baseURL: `http://localhost:4000/api`,
});
api.interceptors.request.use((request) => {
  const token = localStorage.getItem('user');
  if(token) {
    request.headers['Authorization'] = `Bearer ${token}`;
  }
  return request;
}, (error) => {return Promise.reject(error);});
api.interceptors.response.use((response) => {return response;}, (error) => {
  if(error?.response?.status === 401) {
    console.log('please login');
    window.location.href = '/logout';
  }
  else {
    return Promise.reject(error);
  }
});
