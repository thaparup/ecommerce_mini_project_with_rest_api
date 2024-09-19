import React from 'react'
import { CiShoppingCart } from 'react-icons/ci'



interface NavItemForMediumAndSmallerScreenProps {
    menuBurger: boolean,
    setMenuBurger: React.Dispatch<React.SetStateAction<boolean>>
}
const NavItemForMediumAndSmallerScreen: React.FC<NavItemForMediumAndSmallerScreenProps> = ({ menuBurger, setMenuBurger }) => {
    return (
        <li className='flex md:hidden gap-4'>


            <div className=" flex self-center relative">
                <CiShoppingCart size={24} className='self-center text-primaryColor' />
                <div className='bg-primaryColor h-5 w-5 flex rounded-full absolute top-3 left-3'>
                    <p className='mx-auto self-center text-white text-sm'>0</p>
                </div>

            </div>

            <div className={` flex gap-1 flex-col my-auto w-7 ${menuBurger && 'gap-0 relative'}`} onClick={() => setMenuBurger(true)}>
                <div className={` bg-black w-7 h-1 rounded-md ${menuBurger && ' absolute  rotate-45 transition-all duration-300 ease-out'}`}></div>
                <div className={`bg-black w-7 h-1 rounded-md ${menuBurger && 'absolute rotate-[-45deg] transition-all duration-300 ease-out'}`}></div>
                <div className={` ${menuBurger ? 'hidden' : 'bg-black w-7 h-1 rounded-md'}`}></div>
            </div>



        </li>
    )
}

export default NavItemForMediumAndSmallerScreen