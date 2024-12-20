import { useEffect, useRef } from "react";
import emailjs from "emailjs-com";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../states/store/store";
import { useAddressContext } from "../states/context/AddressContext";
import { toast } from "sonner";
import { Toaster } from "../components/ui/sonner";
import SuccessTable from "../components/SuccessTable";
import { useCartTotal } from "../hooks/useCartTotal";
import { HtmlEmail } from "../components/HtmlEmail";

const PaymentSuccess = () => {
    const fetchRef = useRef<boolean>(false);

    const navigate = useNavigate();
    const storage = JSON.parse(localStorage.getItem("checkout")!);

    useEffect(() => {
        if (!storage || !storage.isCartConfirmed || !storage.isPaymentConfirmed) {
            navigate("/cart");
        }
    }, [navigate]);

    const auth = JSON.parse(localStorage.getItem("auth")!);
    const cart = useSelector((state: RootState) => state.cart);
    const { address } = useAddressContext();

    const rows = cart.cart
        .map((item, index) => {
            return `
        <tr>
        <td>${index + 1}</td>
        <td>${item.title}</td>
        <td>${item.quantity || 1}</td>
        <td>Rs. ${Math.floor(item.price * 135)}</td>
        </tr>
        `;
        })
        .join("");

    const sum = useCartTotal();

    const tableHTML = HtmlEmail({ rows, address, sum });
    const sendEmail = async () => {
        const templateParams = {
            to_email: auth.email,
            from_email: "emart@bussiness.com",
            from_name: "Emart Sales Department",
            to_name: auth.name,
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

            if (response.status === 200) {
                localStorage.removeItem("cart");
                localStorage.removeItem("address");
                localStorage.removeItem("totalQuantity");
                localStorage.removeItem("checkout");
                setTimeout(() => {
                    navigate("/");
                }, 5000);
            }
        } catch (error) {
            console.error("Failed to send email:", error);
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
        <div className="pb-12">
            <Toaster />
            <h1 className="text-center font-medium p-2 mt-12">Invoice from Emart</h1>

            <SuccessTable cart={cart.cart} address={address} sum={sum} />
        </div>
    );
};

export default PaymentSuccess;
