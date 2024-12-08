import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { JsonWebKey } from "crypto";

type Auth = {
  token: string | "";
};

const initialState: Auth = {
  token: localStorage.getItem("token")!,
};

export const AuthSlicer = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login: (state, actions: PayloadAction<string>) => {
      localStorage.setItem("token", actions.payload);
    },
    logout: (state) => {
      state.token = "";
    },
  },
});

export const { login, logout } = AuthSlicer.actions;
export default AuthSlicer.reducer;
