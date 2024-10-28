import React, { useState } from "react";
import { FaBox, FaShoppingCart } from "react-icons/fa";

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
    const [isClicked, setIsClicked] = useState(false);
    const [atc, setAtc] = useState<string>("Add to cart");

    const handleClick = () => {
        setIsClicked(true);

        setTimeout(() => {
            setIsClicked(false);
            setAtc("Added");

            setTimeout(() => {
                setAtc("Add to cart");
            }, 500);
        }, 1500);
    };

    return (
        <div className="relative flex flex-col cardBoxShadow rounded-md">
            <img
                src={thumbnail}
                alt=""
                className="w-full h-[270px] rounded-md bg-zinc-200 object-contain"
            />

            <div className="flex justify-between pt-3 font-medium text-xl px-3">
                <h1>{brand ? brand : title}</h1>
                <h3>${price}</h3>
            </div>
            <h3 className="font-light text-[16px] px-3 mt-1">{title}</h3>

            <div className="my-4 flex  justify-between gap-4 text-white font-medium px-3">
                <button
                    className="bg-primaryColor w-full py-3 rounded-md relative overflow-hidden"
                    onClick={handleClick}
                >
                    <FaShoppingCart
                        size={29}
                        className={`absolute  -translate-x-[30px] translate-y-2  text-white ${isClicked && "cartAnimation"
                            }`}
                    />

                    <span className={isClicked ? "opacity-0" : ""}>{atc}</span>

                    <FaBox
                        size={15}
                        className={`absolute translate-y-[-54px] translate-x-[80px]  text-white  ${isClicked && "boxAnimation"
                            }`}
                    />
                </button>
                <button className="bg-purple-400 w-full py-3 rounded-md">
                    Details
                </button>
            </div>
        </div>
    );
};

export default Product;
