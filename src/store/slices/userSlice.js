// src/store/slices/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Api from '../../../config'
// Example API endpoints – replace with your actual endpoints
export const getUsers = createAsyncThunk('users/getUsers', async () => {
  const response = await axios.get(`${Api}/get-users`);
  return response.data;
});

export const addUser = createAsyncThunk('users/addUser', async (newUser) => {
  const response = await axios.post(`${Api}`, newUser);
  return response.data;
});

export const updateUseres = createAsyncThunk('users/updateUser', async (updatedUser) => {
  const response = await axios.put(`${Api}/users/${updatedUser.id}`, updatedUser);
  return response.data;
});

export const updateUserstatus = createAsyncThunk('users/updateStatus', async ({ userId, status }) => {
  console.log(userId, "status", status);
  const response = await axios.put(`${Api}/user-status-update/${userId}`, { status });
  return response.data;
});

export const deleteUseres = createAsyncThunk('users/deleteUser', async (userId) => {
  await axios.delete(`${Api}/users/${userId}`);
  return userId;
});

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(updateUseres.fulfilled, (state, action) => {
        const index = state.users.findIndex(u => u.id === action.payload.id);
        if (index !== -1) state.users[index] = action.payload;
      })
      .addCase(updateUserstatus.fulfilled, (state, action) => {
        const user = state.users.find(u => u.id === action.payload.id);
        if (user) user.status = action.payload.status;
      })
      .addCase(deleteUseres.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user.id !== action.payload);
      });
  },
});

export default userSlice.reducer;
