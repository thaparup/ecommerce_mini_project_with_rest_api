import { FC, useEffect, useState } from "react"
import { Toaster } from "../components/ui/sonner"
import CartList from "../components/CartList"
import ProceedToCheckout from "../components/ProceedToCheckout"
import { useSelector } from "react-redux"
import { RootState } from "../states/store/store"
import { useAddressContext } from "../states/context/AddressContext"

const Cart: FC = () => {
    const cart = useSelector((state: RootState) => state.cart);



    return (
        <div>

            {/* <section className={`flex my-12 w-[100%]  justify-center `}>
                <Toaster position="top-right" theme="light" duration={1000} />

                <div className=" w-[80%] max-xl:w-[85%] max-lg:w-[88%] flex gap-6 max-md:flex-col">
                    {cart.totalQuantity === 0 ? <h1 className="text-xl font-medium ml-12 basis-[65%]">Cart is empty !!!</h1> : <CartList />}
                    <ProceedToCheckout />
                </div>



            </section> */}


        </div>

    )
}

export default Cart