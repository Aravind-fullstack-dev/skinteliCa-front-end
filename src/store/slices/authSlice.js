import { createSlice } from '@reduxjs/toolkit';

// Rehydrate user from localStorage on page load
const savedUser = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: savedUser || null,
  token: savedUser?.token || null,
  isAuthenticated: !!savedUser,
  isAdmin: savedUser?.role === 'admin' || false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      const user = action.payload; // user includes { name, email, role, token, etc. }
      state.user = user;
      state.token = user.token;
      state.isAuthenticated = true;
      state.isAdmin = user.role === 'admin';
      state.loading = false;
      state.error = null;

      // Store user in localStorage
      localStorage.setItem('user', JSON.stringify(user));
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isAdmin = false;
      state.loading = false;
      state.error = null;

      // Clear from localStorage
      localStorage.removeItem('user');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;
