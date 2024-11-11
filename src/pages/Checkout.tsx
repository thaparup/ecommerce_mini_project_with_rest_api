import { FC } from "react"
import CartList from "../components/CartList"
import { useSelector } from "react-redux"
import { RootState } from "../states/store/store"

const Checkout: FC = () => {

    const cart = useSelector((state: RootState) => state.cart.cart)
    return (
        <section className="mx-12 flex gap-8 my-12">
            <div className="basis-[70%]">

                {cart.map(({ id, title, thumbnail, brand, quantity, price }) => <CartList thumbnail={thumbnail} price={price} quantity={quantity || 0} brand={brand} title={title} key={id} />)}
            </div>
            <div className="basis-[30%]">

            </div>
        </section>
    )
}

export default Checkout