import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import cartSlicer from "./slices/cartSlice";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    cart: cartSlicer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
