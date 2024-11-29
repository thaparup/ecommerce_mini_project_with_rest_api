import { FC } from 'react'
import { RootState } from '../states/store/store'
import { useSelector } from 'react-redux'
import CartItem from './CartItem'


const CartList: FC = () => {
    const cart = useSelector((state: RootState) => state.cart.cart)

    return (
        <div className="basis-[65%]">

            {cart.map(({ id, title, thumbnail, brand, quantity, price }) => <CartItem thumbnail={thumbnail} price={price} quantity={quantity || 0} brand={brand} title={title} key={id} id={id} />)}
        </div>
    )
}

export default CartList