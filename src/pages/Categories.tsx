import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { TypeCategory } from "../types/typeCategory";
import Category from "../components/Category";
import { CategoryList } from "../constants/categoryList";
import ProductSkeleton from "../components/ProductSkeleton";
import CategorySkeleton from "../components/CategorySkeleton";

const Categories = () => {
    const { data, loading, error } = useFetch<TypeCategory[]>(
        "https://dummyjson.com/products/categories"
    );

    return (
        <div className="my-8 mx-12">
            {loading && <div> Loading... </div>}
            <h1 className="text-2xl font-semibold">All Categories</h1>
            {loading && <CategorySkeleton count={8} />}
            <div className=" grid grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-x-5 max-lg:gap-12 gap-y-12 mt-10 max-md:flex  max-md:flex-col max-md:max-w-[24rem] max-md:mx-auto max-md:gap-12 z-10  ">
                {data?.map((cat) => {
                    const matched = CategoryList.find((ele) => ele.slug === cat.slug);

                    return (
                        <Category
                            categoryName={cat.name}
                            imageUrl={matched?.imageUrl}
                            slug={cat.slug}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Categories;
