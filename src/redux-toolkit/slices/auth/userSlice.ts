import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {login, logout} from './authSlice';

export const getUserInfo = createAsyncThunk(
  'user/getUserInfo',
  async (userId, {rejectWithValue}) => {
    try {
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: {},
    userId: '',
    userType: '',
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
      state.userId = action.payload.userId;
      state.userType = action.payload.userType;
    },
    resetUserInfo: (state, _action) => {
      state.userInfo = {};
      state.userId = '';
      state.userType = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login, (state, action) => {
        state.userInfo = action.payload;
        state.userId = action.payload.userId;
        state.userType = action.payload.userType;
      })
      .addCase(logout, (state, _action) => {
        state.userInfo = {};
        state.userId = '';
        state.userType = '';
      })
      .addCase(getUserInfo.fulfilled, (state, _action) => {
        state.userInfo = {};
        state.userId = '';
        state.userType = '';
      })
      .addCase(getUserInfo.rejected, (state, _action) => {
        state.userInfo = {};
        state.userId = '';
        state.userType = '';
      });
  },
});

export const {setUserInfo} = userSlice.actions;
