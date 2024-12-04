import React, { useEffect } from "react";
import emailjs from "emailjs-com";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../states/store/store";
import { useAddressContext } from "../states/context/AddressContext";

const EmailHtml = (): JSX.Element => {
    const cart = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch();
    const { address } = useAddressContext();

    const sum = cart.cart.reduce(
        (acc, cv) => (acc += (cv.quantity || 1) * cv.price),
        0
    );

    return (
        <div>
            <table className="border-collapse  border-slate-500 border-spacing-2 border mx-auto table-auto w-[800px]">
                <thead className="border-2 border-black ">
                    <tr>
                        <th className="py-2 text-center border-r-2 border-black">Brand</th>
                        <th className="text-center border-r-2 border-black">Title</th>
                        <th className="border-r-2 border-black text-center">Quantity</th>
                        <th className=" border-r-2 border-black text-center">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.cart.map((item) => (
                        <tr className="border border-slate-600 ">
                            <td className="p-2 text-left  border-r-2 border-black">
                                {item.brand}
                            </td>
                            <td className="p-2 text-left  border-r-2 border-black">
                                {item.title}
                            </td>
                            <td className="p-2 text-center  border-r-2 border-black">
                                {item.quantity}
                            </td>
                            <td className="p-2 text-left  border-r-2 border-black">
                                Rs. {item.price * 135}
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tbody>
                    <tr className="">
                        <td className="px-2">Total</td>
                        <td></td>
                        <td></td>
                        <td className="text-red-500 text-xl font-medium p-2">
                            Rs. {sum * 135}
                        </td>
                    </tr>
                </tbody>
            </table>

            <div className="w-[700px] mx-auto m-2">
                <h1 className="text-xl font-medium">
                    Your order will be delivered to following address:
                </h1>
                <h3 className="italic">{address}</h3>
            </div>
        </div>
    );
};

const PaymentSuccess = () => {
    const storage = JSON.parse(localStorage.getItem("checkout")!);
    console.log(storage);
    if (!storage.isCartConfirmed || !storage.isPaymentConfirmed)
        return <Navigate to="/cart" />;
    const sendEmail = async () => {
        console.log("Function called");

        const templateParams = {
            to_email: "rupeshthapa3965@gmail.com",
            subject: "Your Order Confirmation",
            message: "s",
        };

        try {
            // const response = await emailjs.send(
            //     'service_uzsk1re',
            //     'contact_form',
            //     templateParams,
            //     'YQ72x7L7RItfWMoq5'
            // );
            // console.log('Email sent successfully:', response.status, response.text);
        } catch (error) {
            console.error("Failed to send email:", error);
        }
    };

    // Run sendEmail only once when the component mounts
    useEffect(() => {
        sendEmail();
    }, []);

    return (
        <div>
            <h1 className="text-center font-medium p-2">Invoice from Emart</h1>
            <EmailHtml />
        </div>
    );
};

export default PaymentSuccess;
