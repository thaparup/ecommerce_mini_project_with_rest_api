import { FaChevronDown } from "react-icons/fa";
import MenuItems from "../MenuItems";
import Menu from "../Menu";
import { useFilterContext } from "../../context/FilterContext";

const FilterByTitle = ({ }): JSX.Element => {

    const { setSelected } = useFilterContext()

    return (


        <div className="flex bg-white px-6 h-20 rounded-[90px] mt-8 relative">
            <div className="flex flex-col gap-[2px] self-center">
                <p className="text-sm leading-none">Sort by</p>
                <h3 className="text-xl font-medium leading-none">Title</h3>
            </div>

            <Menu buttonLabelOrIcon={<FaChevronDown size={10} />} styleButton=' ml-8 border-2 border-[#dddddd] p-4 self-center rounded-[100%] ' styleMenuContainer="top-16 right-8" >

                <div className="flex gap-2 px-4 pt-2">
                    <input type="radio" name="radioOptions" value="?sortBy=title&order=asc" onChange={(e) => setSelected(e.target.value)} />
                    <label htmlFor="">Ascending</label>
                </div>


            </Menu>
        </div>

    );
};

export default FilterByTitle;
