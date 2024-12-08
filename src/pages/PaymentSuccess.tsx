import React, { useEffect, useRef } from "react";
import emailjs from "emailjs-com";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../states/store/store";
import { useAddressContext } from "../states/context/AddressContext";
import { toast } from "sonner";
import { Toaster } from "../components/ui/sonner";
import SuccessTable from "../components/SuccessTable";
import { useCartTotal } from "../hooks/useCartTotal";
import { HtmlEmail } from "../components/HtmlEmail";
import { useCheckoutContext } from "../states/context/CheckoutContext";


const PaymentSuccess = () => {
    const fetchRef = useRef<boolean>(false);
    const storage = JSON.parse(localStorage.getItem("checkout")!);
    if (!storage.isCartConfirmed || !storage.isPaymentConfirmed)
        return <Navigate to="/cart" />;

    const cart = useSelector((state: RootState) => state.cart);
    const { address } = useAddressContext()
    const { setCheckoutState } = useCheckoutContext()

    const rows = cart.cart
        .map((item, index) => {
            return `
        <tr>
        <td>${index + 1}</td>
        <td>${item.title}</td>
        <td>${item.quantity || 1}</td>
        <td>Rs. ${item.price * 135}</td>
        </tr>
        `;
        })
        .join("");

    const sum = useCartTotal();

    const tableHTML = HtmlEmail({ rows, address, sum })
    const sendEmail = async () => {
        const templateParams = {
            to_email: "thaparup3965@gmail.com",
            from_email: "emart@bussiness.com",
            from_name: "Emart Sales Department",
            to_name: "Peter Parker",
            subject: "Your Order Confirmation",
            message: tableHTML,
        };

        try {
            const response = await emailjs.send(
                "service_uzsk1re",
                "contact_form",
                templateParams,
                "YQ72x7L7RItfWMoq5"
            );
        } catch (error) {
            console.error("Failed to send email:", error);
        }
        finally {
            setTimeout(() => {
                setCheckoutState({ isCartConfirmed: false, isPaymentConfirmed: false })

            }, 2500)
        }
    };
    useEffect(() => {
        if (!fetchRef.current) {
            toast("You will receive an Invoice on your email", {
                style: { color: "#06b6d4", background: "white" },
                position: "top-right",
                duration: 3000,
            });
            sendEmail();
        }
        fetchRef.current = true;


    }, []);


    return (
        <div>
            <Toaster />
            <h1 className="text-center font-medium p-2 mt-12">Invoice from Emart</h1>

            <SuccessTable cart={cart.cart} address={address} sum={sum} />
        </div>
    );
};

export default PaymentSuccess;
