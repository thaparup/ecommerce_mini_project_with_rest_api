import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import cartSlicer from "./slices/cartSlice";
import authReducer from "./slices/AuthSlice";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    cart: cartSlicer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
