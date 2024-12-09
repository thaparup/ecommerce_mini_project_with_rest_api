import React, { FC, useEffect, useRef, useState } from "react";
import useFetch from "../hooks/useFetch";
import { useParams } from "react-router-dom";

import Product from "../components/Product";
import ProductSkeleton from "../components/ProductSkeleton";

const CategoryBySlug: FC = ({ }) => {
    const { slug } = useParams();

    const { data, loading } = useFetch(
        `https://dummyjson.com/products/category/${slug}`
    );

    return (
        <div>
            {loading && <ProductSkeleton count={8} />}

            <div className="mx-12 grid grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-x-5 max-lg:gap-12 gap-y-12 mt-10 max-md:flex  max-md:flex-col max-md:max-w-[24rem] max-md:mx-auto max-md:gap-12 z-10 ">
                {data?.products.map(({ id, brand, title, price, thumbnail }) => (
                    <Product
                        brand={brand}
                        title={title}
                        price={price}
                        thumbnail={thumbnail}
                        id={id}
                        key={id}
                    />
                ))}
            </div>
        </div>
    );
};

export default CategoryBySlug;
