import React, { useRef, useState, MouseEvent } from "react";
import { FaBox, FaShoppingCart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../states/store/slices/cartSlice";
import { useNavigate } from "react-router-dom";

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
    const [isLoaded, setIsLoaded] = useState(false);
    const addToCartRef = useRef<boolean>(false);
    const navigate = useNavigate()

    const dispatch = useDispatch();
    const handleATC = (event: MouseEvent<HTMLButtonElement>) => {

        event.stopPropagation()

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



    return (
        <div className="relative flex flex-col cardBoxShadow rounded-md hover:shadow-xl hover:cursor-pointer" onClick={() => navigate(`/products/${id}`)} >
            <div className="relative">
                {!isLoaded && (
                    <div className="w-full h-[250px] rounded-md skeleton absolute"></div>
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
                <h3>Rs. {(Math.floor(price * 135))}</h3>
            </div>
            <h3 className="font-light text-[16px] px-3 mt-1">{title}</h3>

            <div className="my-4 flex max-md:flex-col max-md:gap-4 justify-between gap-4 text-white font-medium px-3">
                <button className="relative bg-primaryColor w-full h-[60px] rounded-md active:scale-[.98] overflow-hidden" onClick={handleATC}>
                    <span className={isClicked ? "opacity-0" : ""}>{atc}</span>
                    <FaShoppingCart className={`absolute top-[50%] left-[-10%] z-20 line max-[400px]:left-[-15%] ${isClicked && '  newCartAnimate'}`} size={29} />
                    <FaBox className={`inline absolute top-[-30%] left-[55%] z-30 ${isClicked && 'newBoxAnimate'}`} />
                </button>

            </div>
        </div>
    );
};

export default Product;
