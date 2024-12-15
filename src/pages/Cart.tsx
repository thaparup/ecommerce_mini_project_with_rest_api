import { FC, useEffect, useState } from "react";
import { Toaster } from "../components/ui/sonner";
import CartList from "../components/CartList";
import ProceedToCheckout from "../components/ProceedToCheckout";
import { useSelector } from "react-redux";
import { RootState } from "../states/store/store";
import { jwtDecode } from "jwt-decode";
import { useIsTokenExpired } from "../hooks/useIsTokenExpired";

const Cart: FC = () => {
    const cart = useSelector((state: RootState) => state.cart);
    // const auth = JSON.parse(localStorage.getItem('auth')!)
    // const token = auth.token
    // const decoded = jwtDecode(token)
    // console.log(decoded)
    // const currentTime = new Date().getTime()
    // if (currentTime > decoded.exp * 1000) {
    //     console.log("expired token")
    // }
    // else {
    //     console.log('token not expired')
    // }
    const auth = useIsTokenExpired()
    console.log('auth from custom hook', auth)


    return (
        <section className={`flex my-12 w-[100%]  justify-center `}>
            <Toaster position="top-right" theme="light" duration={1000} />
            <div className=" w-[80%] max-[200px]:w-[100%] max-xl:w-[85%] max-lg:w-[88%] flex gap-6 max-lg:flex-col">
                {cart.totalQuantity === 0 || !cart.totalQuantity ? (
                    <h1 className="text-xl font-medium ml-12 basis-[65%]">
                        Cart is empty !!!
                    </h1>
                ) : (
                    <CartList />
                )}
                <ProceedToCheckout />
            </div>
        </section>
    );
};

export default Cart;
