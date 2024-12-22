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
        <div className="flex flex-col items-center w-full px-4">
            <div className="w-full overflow-x-auto">
                <table className="mt-6 border-collapse border-slate-500 border-spacing-2 border table-auto w-full min-w-[500px]">
                    <thead className="border-2 border-black">
                        <tr>
                            <th className="py-2 text-center border-r-2 border-black whitespace-nowrap px-4">S.NO</th>
                            <th className="py-2 text-center border-r-2 border-black whitespace-nowrap px-4">Brand</th>
                            <th className="text-center border-r-2 border-black whitespace-nowrap px-4">Title</th>
                            <th className="border-r-2 border-black text-center whitespace-nowrap px-4">Quantity</th>
                            <th className="border-r-2 border-black text-center whitespace-nowrap px-4">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((item, index) => (
                            <tr className="border border-slate-600" key={item.id}>
                                <td className="p-2 text-left border-r-2 border-black">
                                    {index + 1}
                                </td>
                                <td className="p-2 text-left border-r-2 border-black">
                                    {item.brand}
                                </td>
                                <td className="p-2 text-left border-r-2 border-black">
                                    {item.title}
                                </td>
                                <td className="p-2 text-center border-r-2 border-black">
                                    {item.quantity}
                                </td>
                                <td className="p-2 text-left border-r-2 border-black">
                                    Rs. {Math.floor(item.price * 135)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tbody>
                        <tr>
                            <td className="px-2 font-medium">Total</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td className="text-red-500 text-xl font-medium p-2">
                                Rs. {Math.floor(sum * 135) + 100}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="w-full max-w-[800px] mx-auto mt-8 px-4">
                <h1 className="text-xl font-medium">
                    Your order will be delivered to the following address:
                </h1>
                <h3 className="italic break-words">{address}</h3>
            </div>
        </div>
    );
};

export default SuccessTable;