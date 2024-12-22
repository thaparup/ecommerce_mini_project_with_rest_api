import { FaChevronDown } from "react-icons/fa";
import Menu from "../Menu";
import { useFilterContext } from "../../states/context/FilterContext";

const FilterByPrice = ({ }) => {
    const { setSelected } = useFilterContext();

    return (
        <div className="flex bg-white px-6 h-20 rounded-[90px] mt-8 relative max-[460px]:w-[70%] ">
            <div className="flex flex-col gap-[2px] self-center  max-[460px]:w-full">
                <p className="text-sm leading-none">Sort by</p>
                <h3 className="text-xl font-semibold leading-none">Price</h3>
            </div>

            <Menu
                buttonLabelOrIcon={<FaChevronDown size={10} className="" />}
                styleButton=" ml-8 border-[1px] border-[#dddddd] p-4 self-center rounded-[100%] "
                styleMenuContainer="top-16 right-8"
            >
                <div className="flex gap-2 px-4 pt-2">
                    <input
                        type="radio"
                        name="radioOptions"
                        value="&sortBy=price&order=asc"
                        onChange={(e) => setSelected(e.target.value)}
                    />

                    <label
                        htmlFor=""
                        onClick={() => setSelected("&sortBy=price&order=asc")}
                    >
                        Ascending
                    </label>
                </div>
                <div className="flex gap-2 px-4 pb-2 ">
                    <input
                        type="radio"
                        name="radioOptions"
                        value="&sortBy=price&order=desc"
                        onChange={(e) => setSelected(e.target.value)}
                    />
                    <label
                        htmlFor=""
                        onClick={() => setSelected("&sortBy=price&order=desc")}
                    >
                        Descending
                    </label>
                </div>
            </Menu>
        </div>
    );
};

export default FilterByPrice;
