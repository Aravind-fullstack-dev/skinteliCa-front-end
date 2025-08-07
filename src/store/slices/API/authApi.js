import axios from 'axios';
import Api from '../../../../config';
// 🔁 change to your backend base URL

export const registerUser = async (userData) => {
  const response = await axios.post(`${Api}/auth/register`, userData);
  return response.data;
};
export const loginUser = async (credentials) => {
  const response = await axios.post(`${Api}/auth/login`, credentials);
  return response.data;
};