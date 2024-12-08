import { useSelector } from "react-redux";
import { RootState } from "../states/store/store";

export const useCartTotal = () => {
  const cart = useSelector((state: RootState) => state.cart.cart); // Use useSelector for state access
  return cart.reduce((acc, cv) => acc + (cv.quantity || 1) * cv.price, 0);
};
