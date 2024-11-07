import React from 'react'


type FilterPriceTitleProps = {
    input: React.InputHTMLAttributes<HTMLInputElement>
}
const FilterPriceTitle: React.FC<FilterPriceTitleProps> = ({ input }) => {
    return (
        <input {...input} />
    )
}

export default FilterPriceTitle