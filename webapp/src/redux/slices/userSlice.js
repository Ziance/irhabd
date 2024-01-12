// userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { login } from "../../services/userService";

const storedUser = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: storedUser || null,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    loginUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginUserSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    loginUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logoutUser: (state) => {
      state.loading = false;
      state.error = null;
      state.user = null;
    },
  },
});

export const { loginUserStart, loginUserSuccess, loginUserFailure, logoutUser } =
  userSlice.actions;

// Thunk actions for fetching data asynchronously

export const userLogin = (credentials) => async (dispatch) => {
  try {
    dispatch(loginUserStart());
    const user = await login(credentials);
    dispatch(loginUserSuccess(user));
    return user;
  } catch (error) {
    dispatch(loginUserFailure(error));
    throw error;
  }
};

export const selectUser = (state) => {
  return state?.reducer?.user?.user;
};
export default userSlice.reducer;
