import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../states/store/store";
import { AiOutlineDelete } from "react-icons/ai";
import Map from "./Map";
import { toast } from "sonner";
import {
    clearCart,
    deleteWholeItemFromTheCart,
} from "../states/store/slices/cartSlice";
import { useAddressContext } from "../states/context/AddressContext";
import { useCartTotal } from "../hooks/useCartTotal";
import { useNavigate } from "react-router-dom";

const ProceedToCheckout: FC = () => {
    const cart = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState<boolean>(false);
    const { address, setAddress } = useAddressContext();
    const sum = useCartTotal()
    const navigate = useNavigate();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const isSuccess = queryParams.get("success");

        if (isSuccess) {
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
        if (!address) {
            toast.warning("Please select the place for the delivery from the map", {
                style: { color: "red" },
                duration: 2000,
            });
            return;
        }

        localStorage.setItem(
            "checkout",
            JSON.stringify({
                isCartConfirmed: true,
                isPaymentConfirmed: false,
            })
        );

        navigate('/cart/confirm');
    };
    return (
        <form
            action="
        "
            onSubmit={submitHandler}
        >
            <div className="basis-[35%] pt-4 ">
                {showModal ? (
                    <div className="fixed inset-0 z-50 flex justify-center items-center transition-all duration-500 ease-in-out ">
                        <Map
                            showModal={showModal}
                            setShowModal={setShowModal}
                            address={address}
                            setAddress={setAddress}
                        />
                    </div>
                ) : null}

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
                                        className="text-[13px] grid grid-cols-12 max-[400px]:flex max-[400px]:flex-col max-[400px]:items-center  px-6 pt-2 gap-2 italic"
                                        key={cartItem.id}
                                    >
                                        <p className="col-span-7">{cartItem.title}</p>
                                        <p className="col-span-1">{cartItem.quantity}</p>
                                        <p className="col-span-3">
                                            Rs. {Math.floor(cartItem.price * 135)}
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
                        <div className="grid grid-cols-12 gap-2 px-6 text-[13px] italic py-3 font-medium max-[400px]:flex max-[400px]:flex-col max-[400px]:items-center">
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
                                Rs. {cart.totalQuantity == 0 ? 0 : (Math.floor(sum * 135 + 100))}
                            </p>
                        </div>
                        <hr className="mx-2 " />
                        <div
                            className="flex w-full justify-center pt-4 pb-8"
                            onClick={() => { }}
                        >
                            <button
                                className="bg-gradient-to-r from-primaryColor to-purple-500 px-10 hover:bg-gradient-to-l  py-2 text-white font-medium rounded-md hover:shadow-md"
                                disabled={cart.totalQuantity === 0}
                                type="submit"
                            >
                                Proceed
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default ProceedToCheckout;
