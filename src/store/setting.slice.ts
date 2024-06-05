import { createSlice } from '@reduxjs/toolkit';

export type SettingsState = {
  editingMode: boolean;
};

const initialState: SettingsState = {
  editingMode: false,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setEditingMode: (state, action: { payload: boolean }) => {
      state.editingMode = action.payload;
    },
    resetEditingMode: (state) => {
      state.editingMode = false;
    },
  },
});

export const { setEditingMode, resetEditingMode } = settingsSlice.actions;

export default settingsSlice.reducer;
