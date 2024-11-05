import React from 'react'
import FilterByTitle from './FilterByTitle'
import PriceRange from './PriceRange'

const index = () => {
    return (
        <div className='flex gap-8 '>
            <FilterByTitle />
            <PriceRange />
        </div>
    )
}

export default index