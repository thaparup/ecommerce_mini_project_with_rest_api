import { FC, useState, Dispatch, SetStateAction } from "react";
import FilterByTitle from "./FilterByTitle";
import FilterByPrice from "./FilterByPrice";

const Filter = ({
    search,
    setSearch,
    setData,
    fetchProductsWhenInputIsClear,
}: {
    search: string;
    setSearch: Dispatch<SetStateAction<string>>;
    setData: Dispatch<SetStateAction<any>>;
    fetchProductsWhenInputIsClear: () => void;
}) => {
    return (
        <div className="flex  justify-between  max-[900px]:flex-wrap  max-[460px]:flex-col max-[460px]:items-center ">
            <FilterByTitle />
            <input
                className="self-end w-96 py-2 rounded-[20px] min-[900px]:block hidden  placeholder:px-2 placeholder:text-sm placeholder:italic placeholder:font-medium ring-none outline-none focus:border-[1px] focus:border-primaryColor "
                placeholder="Search for products......."
                type="text"
                value={search}
                onChange={(e) => {
                    setSearch((prev) => {
                        const newSearchValue = e.target.value;
                        setSearch(newSearchValue);

                        if (prev === "") {
                            setData(null);
                        }

                        if (prev !== "" && !newSearchValue) {
                            fetchProductsWhenInputIsClear();
                        }

                        return newSearchValue;
                    });
                }}
            />
            <FilterByPrice />
            <input
                className="py-2 rounded-[20px] hidden w-full self-center mx-auto mt-8 min-[1px]:block min-[900px]:hidden placeholder:px-2 placeholder:text-sm placeholder:italic placeholder:font-medium ring-none outline-none focus:border-[1px] focus:border-primaryColor "
                placeholder="Search for products......."
                type="text"
                value={search}
                onChange={(e) => {
                    setSearch((prev) => {
                        const newSearchValue = e.target.value;
                        setSearch(newSearchValue);

                        if (prev === "") {
                            setData(null);
                        }

                        if (prev !== "" && !newSearchValue) {
                            fetchProductsWhenInputIsClear();
                        }

                        return newSearchValue;
                    });
                }}
            />
        </div>
    );
};

export default Filter;
