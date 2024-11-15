import { FC, useState } from "react"
import { Toaster } from "../components/ui/sonner"
import CartList from "../components/CartList"
import Checkout from "../components/Checkout"

const Cart: FC = () => {
    return (
        <div>
            <section className={` flex my-12 w-[100%] bg-red- justify-center `}>
                <Toaster position="top-right" theme="light" duration={1000} />

                <div className=" min-w-[80%] flex gap-6">
                    <CartList />
                    <Checkout />
                </div>



            </section>
            <Checkout />
            <Checkout />


        </div>

    )
}

export default Cart