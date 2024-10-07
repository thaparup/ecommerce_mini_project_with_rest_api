import React from "react";

type ProductProps = {
    brand: string;
    price: number;
    title: string;
    thumbnail: string;
};
const Product: React.FC<ProductProps> = ({
    brand,
    price,
    title,
    thumbnail,
}: ProductProps) => {
    return (
        <div className="">
            <img
                src={thumbnail}
                alt=""
                className="w-full h-[300px] rounded-md bg-zinc-200 object-contain"
            />
            <div className="flex justify-between pt-3 font-medium text-xl">
                <h1>{brand}</h1>
                <h3>${price}</h3>
            </div>
            <h3 className="font-light text-md">{title}</h3>
        </div>
    );
};

export default Product;
