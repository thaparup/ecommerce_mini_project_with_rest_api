import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartItem = {
  brand: string;
  price: number;
  title: string;
  thumbnail: string;
  quantity?: number;
};

type Cart = {
  cart: Array<CartItem>;
  totalQuantity: number;
};

const initialState: Cart = {
  cart: [],
  totalQuantity: 0,
};

export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, actions: PayloadAction<CartItem>) => {
      const findMatch = state.cart.find(
        (ele) => ele.title === actions.payload.title
      );
      if (!findMatch) {
        state.cart.push({ ...actions.payload, quantity: 1 });
      } else {
        findMatch.quantity = (findMatch.quantity || 0) + 1;
      }

      state.totalQuantity += 1;
    },
  },
});

export const { addToCart } = CartSlice.actions;
export default CartSlice.reducer;
