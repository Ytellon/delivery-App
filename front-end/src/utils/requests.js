import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

const api = axios.create({
  baseURL: BASE_URL,
});

export const postRequest = async (endpoint, body, config) => {
  const response = await api.post(endpoint, body, config);
  const { data } = response;
  return data;
};

export const putRequest = async (endpoint, body, config) => {
  const response = await api.put(endpoint, body, config);
  const { data } = response;
  return data;
};

export const getRequest = async (endpoint, config) => {
  const response = await api.get(endpoint, config);
  const { data } = response;
  return data;
};

export const deleteRequest = async (endpoint, config) => {
  const response = await api.delete(endpoint, config);
  const { data } = response;
  return data;
};

export const getProducts = async (endpoint, header) => {
  const response = await api.get(endpoint, { headers: { Authorization: header } });
  const { data } = response;
  return data;
};

export default api;
