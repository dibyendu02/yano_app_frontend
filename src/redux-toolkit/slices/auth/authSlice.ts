import {createSlice} from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    isLoggedIn: false,
    accessToken: '',
  },
  reducers: {
    login: (state, _action) => {
      state.isLoggedIn = true;
    },
    logout: (state, _action) => {
      state.isLoggedIn = false;
    },
  },
});

export const {login, logout} = authSlice.actions;
