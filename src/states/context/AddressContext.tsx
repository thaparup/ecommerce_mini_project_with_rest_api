import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";



type TypeAddressContext = {
    address: string,
    setAddress: Dispatch<SetStateAction<string>>
}
const AddressContext = createContext<TypeAddressContext | null>(null)

export const AddressContextProvider = ({ children }: { children: ReactNode }) => {

    const [address, setAddress] = useState<string>('')
    return (
        <AddressContext.Provider value={{ address, setAddress }}>
            {children}
        </AddressContext.Provider>
    )
}

export const useAddressContext = () => {

    const context = useContext(AddressContext)
    if (!context) {
        throw new Error('useFilterContext must be used within a AddressContextProvider')
    }
    return context;
}
