import React from "react";
import { typeProduct } from "../types/typeProduct";

const SuccessTable = ({
    cart,
    address,
    sum,
}: {
    cart: typeProduct[];
    address: string;
    sum: number;
}) => {
    return (
        <div>
            <table className="mt-6 border-collapse  border-slate-500 border-spacing-2 border mx-auto table-auto w-[800px]">
                <thead className="border-2 border-black ">
                    <tr>
                        <th className="py-2 text-center border-r-2 border-black">S.NO</th>
                        <th className="py-2 text-center border-r-2 border-black">Brand</th>
                        <th className="text-center border-r-2 border-black">Title</th>
                        <th className="border-r-2 border-black text-center">Quantity</th>
                        <th className=" border-r-2 border-black text-center">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map((item, index) => (
                        <tr className="border border-slate-600 " key={item.id}>
                            <td className="p-2 text-left  border-r-2 border-black">
                                {index + 1}
                            </td>
                            <td className="p-2 text-left  border-r-2 border-black">
                                {item.brand}
                            </td>
                            <td className="p-2 text-left  border-r-2 border-black">
                                {item.title}
                            </td>
                            <td className="p-2 text-center  border-r-2 border-black">
                                {item.quantity}
                            </td>
                            <td className="p-2 text-left  border-r-2 border-black">
                                Rs. {item.price * 135}
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tbody>
                    <tr className="">
                        <td className="px-2">Total</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td className="text-red-500 text-xl font-medium p-2">
                            Rs. {sum * 135}
                        </td>
                    </tr>
                </tbody>
            </table>

            <div className="w-[700px] mx-auto m-2 mt-8">
                <h1 className="text-xl font-medium">
                    Your order will be delivered to following address:
                </h1>
                <h3 className="italic">{address}</h3>
            </div>
        </div>
    );
};

export default SuccessTable;
