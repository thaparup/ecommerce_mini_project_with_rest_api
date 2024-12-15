import React, { SetStateAction, useEffect, useRef } from "react";
import { LiaTimesSolid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../states/store/store";
import { Navigate, useLocation } from "react-router-dom";
import { useCartTotal } from "../hooks/useCartTotal";

const CheckoutModal = ({
    modal,
    setModal,
    methodOfPayment,
}: {
    modal: boolean;
    setModal: React.Dispatch<SetStateAction<boolean>>;
    methodOfPayment: string;
}) => {
    const storage = JSON.parse(localStorage.getItem("checkout")!);
    if (!storage.isCartConfirmed || !storage) return <Navigate to="/cart" />;

    const location = useLocation();
    const modalRef = useRef(null);
    const cart = useSelector((state: RootState) => state.cart);
    const sum = useCartTotal();
    const amtInNrs = Math.floor((sum * 135) + 100)
    const randomAlphaNumericString = "123456789ABCDEFGHIJKLMONOQRSTUVWQYZX";

    let alphanum = "";
    for (let i = 0; i <= 5; i++) {
        alphanum += randomAlphaNumericString[Math.round(Math.random() * 36)];
    }
    const handleClick = () => {
        const storage = JSON.parse(localStorage.getItem("checkout")!);
        if (!storage.isCartConfirmed || !storage) return <Navigate to="/cart" />;

        if (methodOfPayment === "esewa") {
            const paymentURL = `https://uat.esewa.com.np/epay/main?amt=${amtInNrs}&tAmt=${amtInNrs}&txAmt=0&scd=EPAYTEST&pid=${alphanum}&psc=0&su=http://localhost.5173/cart/success&fu=https://developer.esewa.com.np/failure&pdc=0&secret_key=8gBm/:&EnhH.1/q`;

            window.location.href = paymentURL;
            localStorage.setItem(
                "checkout",
                JSON.stringify({
                    isCartConfirmed: true,
                    isPaymentConfirmed: true,
                })
            );
            console.log(alphanum)


        }

        if (methodOfPayment === "cod") {
            localStorage.setItem(
                "checkout",
                JSON.stringify({
                    isCartConfirmed: true,
                    isPaymentConfirmed: true,
                })
            );
            window.location.href = "http://localhost:5173/success";
        }
    };

    const mouseDowmHandler = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            setModal(false);
        }
    };
    document.addEventListener("mousedown", mouseDowmHandler);

    return (
        <div
            className={` ${modal
                ? "fixed flex justify-center bg-neutral-800/70 inset-0 -z-0 opacity-100 "
                : "opacity-0 h-0 overflow-y-hidden"
                }`}
        >
            <div
                className={`transition-all duration-500 ease-in-out  ${modal
                    ? "bg-white h-fit p-6 rounded-md shadow-md w-[410px] relative translate-y-14"
                    : "-translate-y-36"
                    }`}
                ref={modalRef}
            >
                <button
                    className="absolute top-2 right-3 "
                    onClick={() => setModal(false)}
                >
                    <LiaTimesSolid size={18} />
                </button>
                <h3 className="text-[15px] mt-3 font-light">
                    Are you sure you want to proceed with the selected method of payment?
                </h3>
                <div className="flex justify-end gap-2 mt-6">
                    <button
                        className="text-black text-sm font-medium border-[1px] rounded-md shadow-md p-2 px-5"
                        onClick={() => setModal(false)}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-gradient-to-r from-primaryColor to-purple-500 text-white text-sm font-medium border-[1px] rounded-md shadow-md p-2 px-8"
                        onClick={() => handleClick()}
                    >
                        Yes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CheckoutModal;
