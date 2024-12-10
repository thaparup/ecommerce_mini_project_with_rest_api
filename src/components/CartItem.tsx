import { FC, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart, removeFromTheCart } from "../states/store/slices/cartSlice";
import { toast } from "sonner";

type CartItemProps = {
    thumbnail: string;
    title: string;
    brand: string;
    price: number;
    quantity: number;
    id: number;
};

const CartItem: FC<CartItemProps> = ({
    thumbnail,
    title,
    brand,
    price,
    quantity,
    id,
}): JSX.Element => {
    const [noq, setNoq] = useState<number>(quantity);
    const dispatch = useDispatch();
    const [isImageLoading, setIsImageLoading] = useState<boolean>(false)
    const handleIncrement = (id: number) => {
        setNoq((prev) => prev + 1);
        dispatch(
            addToCart({
                brand: brand,
                price: price,
                title: title,
                thumbnail: thumbnail,
                id: id,
            })
        );
        toast("Added to cart successfully! ");
    };

    const handleDecrement = (id: number) => {
        // setNoq((prev) => prev - 1)
        setNoq((prev) => prev === 0 ? 0 : prev - 1);
        if (noq === 0) {
            return
        }
        dispatch(removeFromTheCart({
            brand: brand,
            price: price,
            title: title,
            thumbnail: thumbnail,
            id: id,
        }))
    }

    return (
        <div className="grid grid-cols-6 gap-2 my-3 bg-[#f7f7f7] rounded-md shadow-md items-center ">
            <div className="flex col-start-1 col-end-5 items-center gap-4">
                {!isImageLoading && (<div className=" ml-2 skeleton rounded-md  w-[100px] h-[100px] "> </div>)}
                <img src={thumbnail} alt="" className=" h-[120px] " onLoad={() => { setIsImageLoading(true) }} />
                <div className="max-sm:text-sm">
                    <h3 className="text-md font-medium">{title}</h3>
                    <h6 className="text-sm font-light text-gray-4300">{brand}</h6>
                </div>
            </div>
            <div className="col-start-5 col-end-8  flex justify-around max-lg:flex-col  max-lg:items-center max-lg:gap-2">
                <h3 className="text-lg text-primaryColor font-semibold col-start-5 col-end-6  ">
                    {" "}
                    Rs. {(price * 135).toFixed()}
                </h3>
                <div className="flex ">
                    <button
                        className="bg-slate-200 px-2 rounded-md "
                        onClick={() => handleDecrement(id)}
                    >
                        -
                    </button>
                    <p className="px-3 ">{noq}</p>
                    <button
                        className="bg-gray-200 px-2 rounded-md"
                        onClick={() => handleIncrement(id)}
                    >
                        +
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
