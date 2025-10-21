import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || 'http://localhost:5000',
  withCredentials: true,
});

export const get = async (url, params) => {
  const { data } = await api.get(url, { params });
  return data;
};

export const post = async (url, body) => {
  const { data } = await api.post(url, body);
  return data;
};
