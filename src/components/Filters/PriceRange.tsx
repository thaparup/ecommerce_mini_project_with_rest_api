
import { FaChevronDown } from "react-icons/fa";
import Menu from "../Menu";
import MenuItems from "../MenuItems";

const PriceRange = () => {



    return (



        <div className="flex bg-white px-6 h-20 rounded-[90px] mt-8 relative" >
            <div className='flex flex-col gap-[2px] self-center'>
                <p className='text-sm leading-none'>Sort by</p>
                <h3 className='text-xl font-medium leading-none'>Price</h3>
            </div>

            <Menu buttonLabelOrIcon={<FaChevronDown size={10} />} styleButton=' ml-8 border-2 border-[#dddddd] p-4 self-center rounded-[100%] ' styleMenuContainer="top-16 right-8" >
                <MenuItems label="Ascending" inputType="checkbox" styleContainer="flex gap-2 px-4 pt-2 " styleLabel="text-sm leading-none" />
                <MenuItems label="Descending" inputType="checkbox" styleContainer="flex gap-2 px-4 pt-2 pb-2" styleLabel="text-sm leading-none" />
            </Menu>


        </div >


    )

};

export default PriceRange;
