import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "./../../../types/typeProductsResponseObject";

type CartItem = Product & {
  quantity?: number;
};

type Cart = {
  cart: Array<CartItem>;
  totalQuantity: number;
};

const initialState: Cart = {
  cart: JSON.parse(localStorage.getItem("cart") || "[]"),
  totalQuantity: JSON.parse(localStorage.getItem("totalQuantity") || "null"),
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

      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem(
        "totalQuantity",
        JSON.stringify(state.totalQuantity)
      );
    },
    clearCart: (state) => {
      state.cart = [];
      state.totalQuantity = 0;

      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem(
        "totalQuantity",
        JSON.stringify(state.totalQuantity)
      );
    },

    deleteWholeItemFromTheCart: (state, actions: PayloadAction<CartItem>) => {
      state.cart = state.cart.filter((cart) => cart.id !== actions.payload.id);

      state.totalQuantity =
        state.totalQuantity - (actions.payload.quantity || 0);

      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem(
        "totalQuantity",
        JSON.stringify(state.totalQuantity)
      );
    },

    removeFromTheCart: (state, actions: PayloadAction<CartItem>) => {
      console.log(actions.payload);
      const findTheProductInTheCart = state.cart.find(
        (ele) => ele.id === actions.payload.id
      );

      if (findTheProductInTheCart) {
        if (findTheProductInTheCart.quantity === 1) {
          const filterTheElementExceptFindTheProductInTheCartElement =
            state.cart.filter((ele) => ele.id !== findTheProductInTheCart.id);
          state.cart = filterTheElementExceptFindTheProductInTheCartElement;
          console.log(findTheProductInTheCart);
          state.totalQuantity = state.totalQuantity - 1;

          localStorage.setItem("cart", JSON.stringify(state.cart));
          localStorage.setItem(
            "totalQuantity",
            JSON.stringify(state.totalQuantity)
          );
        } else {
          findTheProductInTheCart.quantity = findTheProductInTheCart.quantity
            ? findTheProductInTheCart.quantity - 1
            : 0;

          state.totalQuantity = state.totalQuantity - 1;
        }
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem(
        "totalQuantity",
        JSON.stringify(state.totalQuantity)
      );
    },
  },
});

export const {
  addToCart,
  deleteWholeItemFromTheCart,
  removeFromTheCart,
  clearCart,
} = CartSlice.actions;
export default CartSlice.reducer;
