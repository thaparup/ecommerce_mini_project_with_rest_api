import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../states/store/store";
import { toast, Toaster } from "sonner";
import CheckoutModal from "../components/CheckoutModal";
import { useCheckoutContext } from "../states/context/CheckoutContext";
import { Navigate, useNavigate } from "react-router-dom";
import { useAddressContext } from "../states/context/AddressContext";
import { useCartTotal } from "../hooks/useCartTotal";

const ConfirmMethodOfPayment = () => {
    const navigate = useNavigate();
    const storage = JSON.parse(localStorage.getItem("checkout")!);

    if (!storage) {
        return <Navigate to="/cart" />;
    }

    useEffect(() => {
        return () => {
            setCheckout('');
        };
    }, []);
    const cart = useSelector((state: RootState) => state.cart);
    const [modal, setModal] = useState<boolean>(false);

    const sum = useCartTotal();
    const [checkout, setCheckout] = useState<string>("");
    const { address } = useAddressContext();
    const handleClick = () => {
        console.log(checkout)
        if (!checkout) {
            toast.warning("Please choose the method of payment", {
                style: { color: "red", fontSize: "1rem" },
                duration: 1500,
            });
            return;
        }
        setModal(true);
    };
    return (
        <div className=" m-14 rounded-md p-6 bg-white w-[70%] mx-auto lg:w-[80%] md:w-[85%] sm:w-[90%] max-[639px]:w-[90%]">
            <CheckoutModal
                modal={modal}
                setModal={setModal}
                methodOfPayment={checkout}
            />
            <Toaster position="top-right" theme="light" duration={1000} />

            <h1 className="text-xl font-medium underline">Your order</h1>
            <div className=" my-8 ">
                {cart.cart.map((item) => (
                    <div key={item.id}>
                        <div className="list-none grid grid-cols-12 max-[450px]:flex max-[450px]:flex-col max-[450px]:items-center text-[15px] italic font-light pb-2">
                            <li className="col-span-8">{item.title}</li>
                            <li className="col-span-2">Qty. {item.quantity}</li>
                            <li className="col-span-2">Rs. {(item.price * 135).toFixed()}</li>
                        </div>
                        <hr className="pt-2" />
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-12 gap-2  text-[13px] italic text-lg font-medium">
                <h4 className="col-span-10 max-sm:col-span-9 text-primaryColor">
                    Grand Total
                </h4>
                <h4 className="col-span-2 text-red-400 max-sm:col-span-3">
                    Rs. {cart.totalQuantity == 0 ? 0 : Math.floor(sum * 135 + 100)}
                </h4>
            </div>
            <hr className="pt-2" />

            <div className="grid grid-cols-12 my-2 mt-6 max-md:flex max-md:flex-col max-md:gap-3 ">
                <h1 className="text-xl font-medium col-span-8 underline max-md:text-center">
                    Your Delivery Address
                </h1>
                <h4 className="italic col-span-4">{address}</h4>
            </div>
            <hr className="pt-2" />
            <h1 className="text-xl font-medium mt-8 underline max-sm:text-center">
                Confirm your shopping
            </h1>
            <div className="grid grid-cols-12 mt-6 max-sm:flex max-sm:flex-col max-sm:gap-7">
                <div className="col-span-8 max-sm:self-center">
                    <div className="flex gap-8 max-[450px]:flex max-[450px]:flex-col max-[450px]:gap-4">
                        <div className="flex gap-1">
                            <input
                                type="radio"
                                name="checkout"
                                value="cod"
                                onChange={(e) => setCheckout(e.target.value)}
                            />
                            <label htmlFor="">Cash on delivery</label>
                        </div>
                        <div className="flex gap-1">
                            <input
                                type="radio"
                                name="checkout"
                                value="esewa"
                                onChange={(e) => setCheckout(e.target.value)}
                            />
                            <label htmlFor="">Pay with esewa</label>
                        </div>
                    </div>
                </div>

                <div className="col-span-4 flex justify-center">
                    <button
                        className=" bg-gradient-to-r from-primaryColor to-purple-500 px-12 hover:bg-gradient-to-l  py-2 text-white font-medium rounded-md hover:shadow-md"
                        type="button"
                        onClick={() => handleClick()}
                    >
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmMethodOfPayment;
