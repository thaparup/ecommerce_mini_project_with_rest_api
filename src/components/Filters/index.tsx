import { FC } from 'react';
import FilterByTitle from './FilterByTitle';
import FilterByPrice from './FilterByPrice';



const Index: FC = ({ }) => {


    return (

        <div className="flex  justify-between max-[460px]:flex-col max-[460px]:items-center">
            <FilterByTitle />
            <FilterByPrice />
        </div>
    );
};

export default Index;