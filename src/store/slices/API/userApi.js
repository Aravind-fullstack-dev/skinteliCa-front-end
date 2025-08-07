import axios from 'axios';
import Api from '../../../../config';
import { data } from 'react-router-dom';

export const fetchUsers = async () => {
  const response = await axios.get(`${Api}/get-users`);
  return response.data;
};
export const updateUser = async (data) => {
  const response = await axios.put(`${Api}/users/${data.id}`,data );
  return response.data;
};

export const deleteUser = async(data) =>{
    const response = await axios.delete(`${Api}/users/${data.id}`);    
    return response.data
}

export const addUserData = async (data) => {
  const response = await axios.post(`${Api}/users`, data);
  return response.data;
}

export const updateUserStatus = async (data) => {
  const response = await axios.put(`${Api}/users/${data.id}`, data);
  return response.data;
}