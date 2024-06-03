import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import type { User, UserCredentials } from '../types/user.types';
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

    localStorage.setItem('sessionData', JSON.stringify(data));

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
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Authorization failed';
        state.isLoading = false;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
