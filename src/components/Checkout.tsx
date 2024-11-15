import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../states/store/store";
import { AiOutlineDelete } from "react-icons/ai";
import Location from "./Location";
import Map from "./Map";

const Checkout: FC = () => {
    const cart = useSelector((state: RootState) => state.cart);
    const [showModal, setShowModal] = useState<boolean>(false)
    return (
        <div>
            <Map showModal={showModal} setShowModal={setShowModal} />

            <div className="basis-[35%] flex flex-col bg-white gap-4">
                <button className="bg-primaryColor py-2 text-white font-medium" onClick={() => setShowModal(true)}>
                    VIEW ON MAP
                </button>

                <div className="bg-purple-500 w-full py-2">
                    <label htmlFor="" className="text-center text-white block font-medium">
                        Order Summary
                    </label>
                </div>

                <div className="">
                    {cart.cart.map((cartItem) => {
                        return (
                            <div key={cartItem.id}>
                                <div
                                    className="text-[13px] grid grid-cols-12 px-6 pt-2 gap-2 italic"
                                    key={cartItem.id}
                                >
                                    <p className="col-span-7">{cartItem.title}</p>
                                    <p className="col-span-1">{cartItem.quantity}</p>
                                    <p className="col-span-3">${cartItem.price}</p>
                                    <AiOutlineDelete
                                        size={22}
                                        className="text-primaryColor col-span-1"
                                    />
                                </div>

                                <hr className="mx-2 mt-2" />
                            </div>
                        );
                    })}
                    <div className="grid grid-cols-12 gap-2 px-6 text-[13px] italic py-3">
                        <p className="col-span-7  ">Total Cost & Quantity</p>
                        <p className="col-span-1">{cart.totalQuantity}</p>
                        <p className="col-span-4 ">$52333</p>
                    </div>
                    <hr className="mx-2 " />
                    <div className="grid grid-cols-12 gap-2 px-6 text-[13px] italic py-3">
                        <p className="col-span-8 ">Shipping cost</p>
                        <p className="col-span-4 ">$12</p>
                    </div>
                    <hr className="mx-2 " />
                    <div className="grid grid-cols-12 gap-2 px-6 text-[13px] italic py-3  text-lg font-medium">
                        <p className="col-span-8  text-primaryColor">Grand Total</p>
                        <p className="col-span-4 text-red-400">$1289</p>
                    </div>
                    <hr className="mx-2 " />
                    <div className="flex w-full justify-center pt-4 pb-8">

                        <button className="bg-primaryColor px-10  py-2 text-white font-medium">Checkout</button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Checkout;
