import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Counter = {
  counter: number;
};
const initialState: Counter = {
  counter: 0,
};
export const CounterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state: Counter) => {
      state.counter += 1;
    },
    incrementByAmount: (state, actions: PayloadAction<number>) => {
      state.counter += actions.payload;
    },
  },
});
export const { increment, incrementByAmount } = CounterSlice.actions;
export default CounterSlice.reducer;
