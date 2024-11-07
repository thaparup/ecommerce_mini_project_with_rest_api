import { createContext, ReactNode, SetStateAction, Dispatch, useState, useContext } from "react";




type FilterContext = {

    selected: string,
    setSelected: Dispatch<SetStateAction<string>>;
}
export const FilterContext = createContext<FilterContext | null>(null)

export const FilterContextProvider = ({ children }: { children: ReactNode }) => {
    const [selected, setSelected] = useState('')

    return (

        <FilterContext.Provider value={{ selected, setSelected }}>

            {children}
        </FilterContext.Provider>
    )

}


export const useFilterContext = () => {
    const context = useContext(FilterContext)

    if (!context) {
        throw new Error('useFilterContext must be used within a FilterContextProvider')
    }
    return context;
}