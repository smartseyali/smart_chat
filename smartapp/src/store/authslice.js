// store/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    waba_id: "",
    app_id: "",
    app_secret: "",
    access_token: "",
    verify_token: "",
  },
  reducers: {
    setAuth: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearAuth: () => ({
      user: null,
      waba_id: "",
      app_id: "",
      app_secret: "",
      access_token: "",
      verify_token: "",
    }),
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
