
import { FaChevronDown } from "react-icons/fa";
import Menu from "../Menu";
import MenuItems from "../MenuItems";
import { useFilterContext } from "../../context/FilterContext";




const PriceRange = ({ }) => {

    const { selected, setSelected } = useFilterContext()
    return (



        <div className="flex bg-white px-6 h-20 rounded-[90px] mt-8 relative" >
            <div className='flex flex-col gap-[2px] self-center'>
                <p className='text-sm leading-none'>Sort by</p>
                <h3 className='text-xl font-medium leading-none'>Price</h3>
            </div>

            <Menu buttonLabelOrIcon={<FaChevronDown size={10} />} styleButton=' ml-8 border-2 border-[#dddddd] p-4 self-center rounded-[100%] ' styleMenuContainer="top-16 right-8" >
                {/* <MenuItems inputType="radio" label="Ascending" styleContainer="flex gap-2 px-4 pt-2" styleLabel="text-sm leading-none" />
                <MenuItems inputType="radio" label="Descending" styleContainer="flex gap-2 px-4 pt-2" styleLabel="text-sm leading-none" /> */}

                <div className="flex gap-2 px-4 pt-2">
                    <input type="radio" name="radioOptions" value="&sortBy=price&order=asc" onChange={(e) => setSelected(e.target.value)} />

                    <label htmlFor="">Ascending</label>
                </div>
                <div className="flex gap-2 px-4 pb-2 ">
                    <input type="radio" name="radioOptions" value="&sortBy=price&order=desc" onChange={(e) => setSelected(e.target.value)} />
                    <label htmlFor="">Descending</label>
                </div>

            </Menu>


        </div >


    )

};

export default PriceRange;
