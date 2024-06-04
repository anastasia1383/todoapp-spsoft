import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { type User, type UserCredentials } from '../types/user.types';
import { getUser } from '../services/usersService';

export type AuthState = {
  isLoggedIn: boolean;
  user: User | null;
  status: 'idle' | 'succeeded' | 'loading' | 'failed';
  error: string | null;
  isLoading: boolean;
};

export const login = createAsyncThunk<
  User,
  UserCredentials,
  { rejectValue: string }
>('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const { email } = credentials;
    const data = await getUser(email);

    return data;
  } catch (e: unknown) {
    const error = e as Error;

    return rejectWithValue(error.message);
  }
});

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  status: 'idle',
  error: null,
  isLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.error = null;
      state.status = 'idle';
    },
    initializeAuthState: (state, action) => {
      const userData = action.payload;
      if (userData) {
        state.isLoggedIn = true;
        state.user = userData;
        state.status = 'succeeded';
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.isLoading = false;
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Authorization failed';
        state.isLoading = false;
        state.isLoggedIn = false;
      });
  },
});

export const { logout, initializeAuthState } = authSlice.actions;

export default authSlice.reducer;
