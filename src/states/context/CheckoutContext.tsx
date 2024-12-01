import { createContext, ReactNode, useContext, useState, Dispatch, SetStateAction } from "react";

type Checkout = {
    isCartConfirmed: boolean;
    isPaymentConfirmed: boolean;
};

type CheckoutContextType = {
    checkoutState: Checkout;
    setCheckoutState: Dispatch<SetStateAction<Checkout>>;
};

const CheckoutContext = createContext<CheckoutContextType | null>(null);

export const CheckoutContextProvider = ({ children }: { children: ReactNode }) => {
    const [checkoutState, setCheckoutState] = useState<Checkout>({
        isCartConfirmed: false,
        isPaymentConfirmed: false,
    });

    return (
        <CheckoutContext.Provider value={{ checkoutState, setCheckoutState }}>
            {children}
        </CheckoutContext.Provider>
    );
};

export const useCheckoutContext = () => {
    const context = useContext(CheckoutContext);

    if (!context) {
        throw new Error("useCheckoutContext must be used within a CheckoutContextProvider");
    }

    return context; // Return the context value here
};
