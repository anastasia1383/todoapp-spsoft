import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {
  GuardedActions,
  PermissionsRequest,
  PermissionsResponse,
} from '../types/user.types';
import { checkPermissions } from '../services/usersService';
import { Status } from '../types/status.enum';

export type PermissionState = {
  status: Status;
  error: string | null;
  isLoading: boolean;
  permissions: GuardedActions[];
};

export const checkUserPermissions = createAsyncThunk<
  PermissionsResponse,
  PermissionsRequest,
  { rejectValue: string }
>('permissions/checkPermissions', async (req, { rejectWithValue }) => {
  try {
    const data = await checkPermissions(req);
    return data;
  } catch (e: unknown) {
    const error = e as Error;

    return rejectWithValue(error.message);
  }
});

const initialState: PermissionState = {
  status: Status.Idle,
  error: null,
  isLoading: false,
  permissions: [],
};

const permissionsSlice = createSlice({
  name: 'permissions',
  initialState,
  reducers: {
    resetPermissions: (state) => {
      state.status = Status.Idle;
      state.error = null;
      state.isLoading = false;
      state.permissions = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkUserPermissions.pending, (state) => {
        state.status = Status.Loading;
        state.isLoading = true;
        state.error = null;
        state.permissions = [];
      })
      .addCase(checkUserPermissions.fulfilled, (state, action) => {
        state.status = Status.Succeeded;
        state.isLoading = false;
        state.permissions = action.payload.permissions;
      })
      .addCase(checkUserPermissions.rejected, (state, action) => {
        state.status = Status.Failed;
        state.error = action.payload || 'Permissions check failed';
        state.isLoading = false;
        state.permissions = [];
      });
  },
});

export const { resetPermissions } = permissionsSlice.actions;

export default permissionsSlice.reducer;
