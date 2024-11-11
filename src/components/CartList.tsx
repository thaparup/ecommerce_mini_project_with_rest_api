import { FC } from "react"


type CartListProps = {
    thumbnail: string;
    title: string,
    brand: string,
    price: number,
    quantity: number

}
const CartList: FC<CartListProps> = ({ thumbnail, title, brand, price, quantity }): JSX.Element => {
    return (
        <div className="flex justify-around my-3 bg-[#f7f7f7]  rounded-md shadow-md items-center">
            <img src={thumbnail} alt="" className="w-[130px] h-[120px]  object-contain" />
            <div className="">
                <h3 className="text-md font-medium">{title}</h3>
                <h6 className="text-sm font-light text-gray-4300">{brand}</h6>
            </div>
            <h3 className="text-lg text-primaryColor font-semibold "> ${price}</h3>
            <div className="flex">
                <button className="bg-slate-200 px-2 rounded-md">-</button>
                <p className="px-3 ">{quantity}</p>
                <button className="bg-gray-200 px-2 rounded-md">+</button>
            </div>
        </div>
    )
}

export default CartList