import React, { useRef, useState } from "react";
import { FaBox, FaShoppingCart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../states/store/slices/cartSlice";

type ProductProps = {
    brand: string;
    price: number;
    title: string;
    thumbnail: string;
    id: number
};
const Product: React.FC<ProductProps> = ({
    brand,
    price,
    title,
    thumbnail,
    id
}: ProductProps) => {
    const [isClicked, setIsClicked] = useState(false);
    const [atc, setAtc] = useState<string>("Add to cart");
    const addToCartRef = useRef<boolean>(false);

    const dispatch = useDispatch();

    const handleClick = () => {
        if (addToCartRef.current) return;
        addToCartRef.current = true;
        setIsClicked(true);

        dispatch(
            addToCart({
                brand: brand,
                price: price,
                title: title,
                thumbnail: thumbnail,
                id: id,
            })
        );
        setTimeout(() => {
            setIsClicked(false);
            setAtc("Added");

            setTimeout(() => {
                setAtc("Add to cart");
                addToCartRef.current = false;
            }, 500);
        }, 1500);
    };

    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className="relative flex flex-col cardBoxShadow rounded-md ">
            <div className="relative">
                {!isLoaded && (
                    <div className="w-full h-[270px] rounded-md skeleton absolute"></div>
                )}

                <img
                    src={thumbnail}
                    alt=""
                    className={`w-full h-[250px] max-xl:h-[270px] max-lg:h-[270px]  rounded-md bg-zinc-200 object-contain opacity-0 py-4 max-xl:py-0  ${isLoaded && "opacity-100"
                        }`}
                    onLoad={() => {
                        setTimeout(() => {
                            setIsLoaded(true);
                        }, 500);
                    }}
                />
            </div>

            <div className="flex justify-between pt-3 font-medium text-lg px-3">
                <h1>{brand ? brand : title}</h1>
                <h3>${price}</h3>
            </div>
            <h3 className="font-light text-[16px] px-3 mt-1">{title}</h3>

            <div className="my-4 flex max-md:flex-col max-md:gap-4 justify-between gap-4 text-white font-medium px-3">
                <button
                    className="bg-primaryColor w-full py-3 rounded-md relative overflow-hidden "
                    onClick={handleClick}
                >
                    <FaShoppingCart
                        size={29}
                        className={`absolute  -translate-x-[30px] translate-y-2  text-white ${isClicked &&
                            "max-sm:animate-none max-md:animate-none cartAnimation"
                            }`}
                    />

                    <span className={isClicked ? "opacity-0" : ""}>{atc}</span>

                    <FaBox
                        size={15}
                        className={`absolute translate-y-[-54px] translate-x-[80px]  text-white  ${isClicked &&
                            "max-md:animate-none max-sm:animate-none boxAnimation"
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
