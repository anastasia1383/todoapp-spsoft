import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {
  GuardedActions,
  PermissionsRequest,
  PermissionsResponse,
} from '../types/user.types';
import { checkPermissions } from '../services/usersService';

export type PermissionState = {
  status: 'idle' | 'succeeded' | 'loading' | 'failed';
  error: string | null;
  isLoading: boolean;
  permissions: GuardedActions[];
};

export const checkUserPermissions = createAsyncThunk<
  PermissionsResponse,
  PermissionsRequest,
  { rejectValue: string }
>('auth/checkPermissions', async (req, { rejectWithValue }) => {
  try {
    const data = await checkPermissions(req);
    return data;
  } catch (e: unknown) {
    const error = e as Error;

    return rejectWithValue(error.message);
  }
});

const initialState: PermissionState = {
  status: 'idle',
  error: null,
  isLoading: false,
  permissions: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetPermissions: (state) => {
      state.status = 'idle';
      state.error = null;
      state.isLoading = false;
      state.permissions = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkUserPermissions.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
        state.error = null;
        state.permissions = [];
      })
      .addCase(checkUserPermissions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isLoading = false;
        state.permissions = action.payload.permissions;
      })
      .addCase(checkUserPermissions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Permissions check failed';
        state.isLoading = false;
        state.permissions = [];
      });
  },
});

export const { resetPermissions } = authSlice.actions;

export default authSlice.reducer;
