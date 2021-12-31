import axios from 'axios';
import {InternalServerError, RequireLoginError, InvalidPayloadError, UnknownError, IncorrectUsernameOrPasswordError, UsernameAlreadyExistsError} from './error';

const api = axios.create({
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
    return Promise.reject(new RequireLoginError);
  }
  else if(error?.response?.status === 500) {
    return Promise.reject(new InternalServerError(error.response.data.error));
  }
  else {
    return Promise.reject(error);
  }
});

export async function loginApi(payload) {
  try {
    const {data} = await api.post('/login', payload);
    if(!data.token.startsWith('Bearer ')) {
      throw new Error('invalid token');
    }
    localStorage.setItem('user', data.token.slice(7));
    return data;
  } catch(error) {
    if(error?.response?.status === 403) {
      const data = error.response.data.error;
      if(data === 'incorrect username or password') {
        throw new IncorrectUsernameOrPasswordError;
      }
      else if(data === 'incorrect payload') {
        throw new InvalidPayloadError;
      }
      else {
        throw new UnknownError;
      }
    }
    else {
      throw error;
    }
  }
}

export async function registerApi(payload) {
  try {
    const {data} = await api.post('/register', payload);
    return data;
  } catch(error) {
    if(error?.response?.status === 403) {
      const data = error.response.data.error;
      if(data === 'username already exists') {
        throw new UsernameAlreadyExistsError;
      }
      else if(data === 'incorrect payload' || data === 'user information must not be empty') {
        throw new InvalidPayloadError;
      }
      else {
        throw new UnknownError;
      }
    }
    else {
      throw error;
    }
  }
}

export async function logoutApi(payload) {
  try {
    const {data} = await api.post('/logout', payload);
    localStorage.removeItem('user');
    return data;
  } catch(error) {
    throw error;
  }
}

