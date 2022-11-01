import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

const api = axios.create({
  baseURL: BASE_URL,
});

export const postRequest = async (endpoint, body) => {
  const response = await api.post(endpoint, body);
  const { data } = response;
  return data;
};

export const getRequest = async (endpoint) => {
  const response = await api.get(endpoint);
  const { data } = response;
  return data;
};

export default api;
