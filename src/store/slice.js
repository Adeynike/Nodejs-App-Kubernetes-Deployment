// store/slice.js

import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    selectedUserId: null,
  },
  reducers: {
    setSelectedUserId: (state, action) => {
      state.selectedUserId = action.payload;
    },
    clearSelectedUserId: (state) => {
      state.selectedUserId = null;
    },
  },
});

export const { setSelectedUserId, clearSelectedUserId } = userSlice.actions;

export const selectSelectedUserId = (state) => state.user.selectedUserId;

export default userSlice.reducer;
