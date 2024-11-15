import { FC, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../states/store/slices/cartSlice";
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

    return (
        <div className="grid grid-cols-6 gap-2 my-3 bg-[#f7f7f7] rounded-md shadow-md items-center">
            <div className="flex col-start-1 col-end-5 items-center gap-4">
                <img src={thumbnail} alt="" className=" h-[120px] " />
                <div className="">
                    <h3 className="text-md font-medium">{title}</h3>
                    <h6 className="text-sm font-light text-gray-4300">{brand}</h6>
                </div>
            </div>
            <h3 className="text-lg text-primaryColor font-semibold col-start-5 col-end-6 text-center ">
                {" "}
                ${price}
            </h3>
            <div className="flex col-start-6 col-end-8 mx-auto">
                <button
                    className="bg-slate-200 px-2 rounded-md "
                    onClick={() => setNoq((prev) => prev + 1)}
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
    );
};

export default CartItem;
