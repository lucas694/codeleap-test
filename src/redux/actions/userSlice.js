import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUsername: (state, action) => {
      return {
        username: action.payload,
        isLoggedIn: true,
      };
    },
    clearUserState: (state) => {
      return null;
    },
  },
});

export const { setUsername, clearUserState } = userSlice.actions;

export default userSlice.reducer;
