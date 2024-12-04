import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../states/store/store'
import { toast, Toaster } from 'sonner'
import CheckoutModal from '../components/CheckoutModal'
import { useCheckoutContext } from '../states/context/CheckoutContext'
import { Navigate } from 'react-router-dom'
import { useAddressContext } from '../states/context/AddressContext'

const ConfirmMethodOfPayment = () => {

    const storage = JSON.parse(localStorage.getItem('checkout')!)
    console.log(storage.isCartConfirmed)
    // if () {
    //     return <Navigate to='/cart' />
    // }
    console.log("hello world")
    const cart = useSelector((state: RootState) => state.cart)
    const [modal, setModal] = useState<boolean>(false)
    const sum = cart.cart.reduce(
        (acc, cv) => (acc += (cv.quantity || 1) * cv.price),
        0
    );

    const [checkout, setCheckout] = useState<string>('')
    const { address } = useAddressContext()
    const handleClick = () => {
        if (!checkout) {

            toast.warning("Please choose the method of payment", {
                style: { color: "red", fontSize: '1rem' },
                duration: 3000,
            });
            return;

        }

        // 


        setModal(true)


    }
    return (
        <div className=' mt-14 rounded-md p-6 bg-white w-[70%] mx-auto '>
            <CheckoutModal modal={modal} setModal={setModal} methodOfPayment={checkout} />
            <Toaster position="top-right" theme="light" duration={1000} />

            <h1 className='text-xl font-medium underline'>Your order</h1>
            <div className=' my-2 '>
                {cart.cart.map((item) => (
                    <div key={item.id}>

                        <div className="list-none grid grid-cols-12 text-[15px] italic font-light pb-2">
                            <li className='col-span-8'>{item.title}</li>
                            <li className='col-span-2'>Qty. {item.quantity}</li>
                            <li className='col-span-2'>Rs. {item.price.toFixed()}</li>
                        </div>
                        <hr className='pt-2' />
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-12 gap-2  text-[13px] italic text-lg font-medium">
                <h4 className="col-span-10  text-primaryColor">Grand Total</h4>
                <h4 className="col-span-2 text-red-400">
                    Rs. {cart.totalQuantity == 0 ? 0 : (sum * 135 + 100).toFixed()}
                </h4>
            </div>
            <hr className='pt-2' />

            <div className='grid grid-cols-12 my-2 mt-6'>
                <h1 className='text-xl font-medium col-span-8 underline'>Your Delivery Address</h1>
                <h4 className='italic col-span-4'>{address}</h4>
            </div>
            <hr className='pt-2' />
            <h1 className='text-xl font-medium mt-8 underline'>Confirm your shopping</h1>
            <div className='grid grid-cols-12 mt-6'>




                <div className='col-span-8'>
                    <div className='flex gap-8'>
                        <div className='flex gap-1'>
                            <input type="radio" name='checkout' value='cod' onChange={(e) => setCheckout(e.target.value)} />
                            <label htmlFor="">Cash on delivery</label>
                        </div>
                        <div className='flex gap-1'>
                            <input type="radio" name='checkout' value='esewa' onChange={(e) => setCheckout(e.target.value)} />
                            <label htmlFor="">Pay with esewa</label>
                        </div>
                    </div>
                </div>

                <button
                    className=" col-span-2 bg-gradient-to-r from-primaryColor to-purple-500 px-10 hover:bg-gradient-to-l  py-2 text-white font-medium rounded-md hover:shadow-md"

                    type="button"
                    onClick={() => handleClick()}
                >
                    Checkout
                </button>

            </div>

        </div>
    )
}

export default ConfirmMethodOfPayment