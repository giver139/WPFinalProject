import axios from 'axios';

export const api = axios.create({
  baseURL: `http://localhost:4000/`,
});
api.interceptors.response.use((response) => {return response;}, (error) => {
  if(error.response.status === 401) {
    console.log('please login');
    window.location = '/logout';
  }
  else {
    return Promise.reject(error);
  }
});
