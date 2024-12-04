import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";



type TypeAddressContext = {
    address: string | '',
    setAddress: Dispatch<SetStateAction<string>>;
}
const AddressContext = createContext<TypeAddressContext | null>(null)

export const AddressContextProvider = ({ children }: { children: ReactNode }) => {





    const [address, setAddress] = useState(JSON.parse(localStorage.getItem('address')!))

    return (
        <AddressContext.Provider value={{ address, setAddress }}>
            {children}
        </AddressContext.Provider>
    )
}

export const useAddressContext = () => {

    const context = useContext(AddressContext)
    if (!context) {
        throw new Error('useAddressContext must be used within a AddressContextProvider')
    }
    return context;
}
