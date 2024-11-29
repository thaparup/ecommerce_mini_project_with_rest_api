import React, { FC, FormEventHandler, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../states/store/store";
import { AiOutlineDelete } from "react-icons/ai";
import Map from "./Map";
import { toast, Toaster } from "sonner";
import {
    clearCart,
    deleteWholeItemFromTheCart,
} from "../states/store/slices/cartSlice";
import { useLocation } from "react-router-dom";
import PaymentSuccess from "../pages/PaymentSuccess";

const Checkout: FC = () => {
    const cart = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState<boolean>(false);
    const [address, setAddress] = useState<string>("");
    console.log(address);
    const sum = cart.cart.reduce(
        (acc, cv) => (acc += (cv.quantity || 1) * cv.price),
        0
    );
    const amtInNrs = (sum * 135).toFixed();
    useEffect(() => {
        // Check if the URL contains a success indicator
        const queryParams = new URLSearchParams(location.search);
        const isSuccess = queryParams.get("success"); // Adjust based on your eSewa success indicator

        if (isSuccess) {
            alert("this ran for once");
            dispatch(clearCart());
        }
    }, [location.search, dispatch]);

    const randomAlphaNumericString = "123456789ABCDEFGHIJKLMONOQRSTUVWQYZX";

    let alphanum = "";
    for (let i = 0; i <= 5; i++) {
        alphanum += randomAlphaNumericString[Math.round(Math.random() * 36)];
    }

    if (location.search) {
        dispatch(clearCart());
    }

    const submitHandler = (event: React.SyntheticEvent) => {
        event.preventDefault();
        // if (!address) {
        //     toast.warning("Please select the place for the delivery", {
        //         style: { color: "red" },
        //         duration: 3000,
        //     });
        //     return;
        // }

        // const paymentURL = `https://uat.esewa.com.np/epay/main?amt=${amtInNrs}&tAmt=${amtInNrs}&txAmt=0&scd=EPAYTEST&pid=${alphanum}&psc=0&su=https://developer.esewa.com.np/success${location.search}&fu=https://developer.esewa.com.np/failure&pdc=0&secret_key=8gBm/:&EnhH.1/q`;

        window.location.href = `http://localhost:5173/cart/confirm`
    };
    return (
        <form
            action="
        "
            onSubmit={submitHandler}
        >
            <div className="basis-[35%] pt-4 ">
                {/* <Map showModal={showModal} setShowModal={setShowModal} address={address} setAddress={setAddress} /> */}
                <div className="flex flex-col bg-white gap-4">
                    <button
                        type="button"
                        className="bg-gradient-to-r from-primaryColor to-purple-500 px-10 hover:bg-gradient-to-l py-2 text-white font-medium"
                        onClick={() => setShowModal(true)}
                        disabled={cart.totalQuantity == 0}
                    >
                        VIEW ON MAP
                    </button>

                    <div className="bg-purple-500 w-full py-2">
                        <label
                            htmlFor=""
                            className="text-center text-white block font-medium"
                        >
                            Order Summary
                        </label>
                    </div>

                    <div className="">
                        {cart.cart.map((cartItem) => {
                            return (
                                <div key={cartItem.id}>
                                    <div
                                        className="text-[13px] grid grid-cols-12 px-6 pt-2 gap-2 italic"
                                        key={cartItem.id}
                                    >
                                        <p className="col-span-7">{cartItem.title}</p>
                                        <p className="col-span-1">{cartItem.quantity}</p>
                                        <p className="col-span-3">
                                            Rs. {(cartItem.price * 135).toFixed()}
                                        </p>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                dispatch(deleteWholeItemFromTheCart(cartItem))
                                            }
                                        >
                                            <AiOutlineDelete
                                                size={22}
                                                className="text-primaryColor col-span-1"
                                            />
                                        </button>
                                    </div>

                                    <hr className="mx-2 mt-2" />
                                </div>
                            );
                        })}
                        <div className="grid grid-cols-12 gap-2 px-6 text-[13px] italic py-3 font-medium">
                            <p className="col-span-7 ">Total Cost & Quantity</p>
                            <p className="col-span-1">{cart.totalQuantity}</p>
                            <p className="col-span-4 ">Rs. {(sum * 135).toFixed()}</p>
                        </div>
                        <hr className="mx-2 " />
                        <div className="grid grid-cols-12 gap-2 px-6 text-[13px] italic py-3">
                            <p className="col-span-8 ">Shipping cost</p>
                            <p className="col-span-4 ">
                                Rs. {cart.totalQuantity == 0 ? 0 : 100}
                            </p>
                        </div>
                        <hr className="mx-2 " />
                        <div className="grid grid-cols-12 gap-2 px-6 text-[13px] italic py-3  text-lg font-medium">
                            <p className="col-span-8  text-primaryColor">Grand Total</p>
                            <p className="col-span-4 text-red-400">
                                Rs. {cart.totalQuantity == 0 ? 0 : (sum * 135 + 100).toFixed()}
                            </p>
                        </div>
                        <hr className="mx-2 " />
                        <div
                            className="flex w-full justify-center pt-4 pb-8"
                            onClick={() => { }}
                        >
                            <button
                                className="bg-gradient-to-r from-primaryColor to-purple-500 px-10 hover:bg-gradient-to-l  py-2 text-white font-medium rounded-md hover:shadow-md"
                                disabled={cart.totalQuantity == 0}
                                type="submit"
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default Checkout;
