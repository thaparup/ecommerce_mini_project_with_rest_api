import React, { useEffect } from 'react'
import { CiLogout, CiShoppingCart } from 'react-icons/ci'
import { IoPersonOutline } from 'react-icons/io5'


interface NavMenuForMediumAndSmallerDeviceProps {
    menuBurger: boolean
}
const NavMenuForMediumAndSmallerDevice: React.FC<NavMenuForMediumAndSmallerDeviceProps> = ({ menuBurger }) => {

    useEffect(() => {
        document.body.style.margin = '0'
        document.body.style.padding = '0'
        return () => {
            document.body.style.margin = ''; // Clean up on unmount or when menuBurger becomes false
        };
    }, [])
    console.log('From mobile nav menu ', menuBurger)
    return (
        <nav className={`transition-all duration-700 ease-in ${menuBurger ? 'fixed w-screen bg-red-400' : 'w-0 bg-red-400 overflow-hidden -translate-x-48'}`}>
            <div className='flex justify-end'>

                <button className='mt-3 mr-3 font-medium text-xl'>X</button>
            </div>
            <h3 className="text-2xl font-bold leading-0 text-primaryColor text-center">Ecomm</h3>


            <ul>
                <li className='flex justify-between my-2 mx-3 font-medium'>
                    <h3>Name</h3>
                    <IoPersonOutline size={18} className="self-center text-primaryColor" />

                </li>
                <hr />
                <li className='flex justify-between my-2 mx-3 font-medium'>
                    <h3>Cart</h3>
                    {/* <CiShoppingCart size={20} className='self-center text-primaryColor' /> */}
                    <div className=" flex self-center relative">
                        <CiShoppingCart size={24} className='self-center text-primaryColor' />
                        <div className='bg-primaryColor h-5 w-5 flex rounded-full absolute top-3 left-3'>
                            <p className='mx-auto self-center text-white text-sm'>0</p>
                        </div>

                    </div>

                </li>
                <hr />
                <li className='flex justify-between my-2 mx-2 font-medium'>
                    <h3>Logout</h3>
                    <CiLogout size={24} className='self-center text-primaryColor' />

                </li>
                <hr />
            </ul>

        </nav>
    )
}

export default NavMenuForMediumAndSmallerDevice