// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const storedUser = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: storedUser || null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export const selectUser = (state) => {
  return state?.reducer?.user?.user
};
export default userSlice.reducer;
