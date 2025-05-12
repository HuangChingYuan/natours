import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authService";

// 檢查登入狀態
export const checkLoginStatus = createAsyncThunk(
  "auth/checkLoginStatus",
  async () => {
    const res = await authService.isLoggedIn();
    return res.data.data.user;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
