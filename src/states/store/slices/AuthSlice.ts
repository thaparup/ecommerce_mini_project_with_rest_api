import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Auth = {
  auth: {
    token: string;
    email: string;
    name: string;
  };
};

const initialState: Auth = {
  auth: JSON.parse(localStorage.getItem("auth") || "{}"),
};

export const AuthSlicer = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ token: string; email: string; name: string }>
    ) => {
      localStorage.setItem("auth", JSON.stringify(action.payload));
      state.auth = JSON.parse(localStorage.getItem("auth")!);
    },
    logout: (state) => {
      localStorage.removeItem("auth");
      state.auth = JSON.parse(localStorage.getItem("auth") || "{}");
    },
  },
});

export const { login, logout } = AuthSlicer.actions;
export default AuthSlicer.reducer;
