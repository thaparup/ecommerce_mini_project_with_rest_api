import React, { useContext, FC } from 'react';
import FilterByTitle from './FilterByTitle';
import PriceRange from './PriceRange';



const Index: FC = ({ }) => {


    return (

        <div className="flex gap-8">
            <FilterByTitle />
            <PriceRange />
        </div>
    );
};

export default Index;