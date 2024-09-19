import { useState } from "react"
import { CiShoppingCart } from "react-icons/ci"
import { IoPersonOutline } from "react-icons/io5"
import { Link } from "react-router-dom"
import NavItemForMediumAndSmallerScreen from "./NavItemForMediumAndSmallerScreen"
import NavMenuForMediumAndSmallerDevice from "./NavMenuForMediumAndSmallerDevice"

interface NavbarProps {

}
const Navbar: React.FC<NavbarProps> = () => {

    const [menuBurger, setMenuBurger] = useState(false)


    return (
        <>
            <nav className="flex justify-between mt-6">
                <h3 className="text-2xl font-bold leading-0 text-primaryColor">Ecomm</h3>
                <ul className='flex gap-4 self-end font-normal relative text-md max-md:hidden'>
                    <li className={`after:content-[''] after:bg-primaryColor after:h-1 after:w-0 after:block hover:after:w-full after:transition-all after:duration-300 after:ease-in-out`}><Link
                        to=''>Shop</Link></li>
                    <li className={`after:content-[''] after:bg-primaryColor after:h-1 after:w-0 after:block hover:after:w-full after:transition-all after:duration-300 after:ease-in-out`}><Link to='' >Categories</Link></li>
                </ul>
                <ul className='flex gap-7 self-end font-normal text-md max-md:hidden'>
                    <li className="flex gap-[3px] ">
                        <CiShoppingCart size={20} className='self-center text-primaryColor' />
                        <p>Cart</p>
                        <p className='text-primaryColor'>0</p>
                    </li>
                    <li className='flex gap-[3px] '>
                        <IoPersonOutline size={18} className="self-center text-primaryColor" />
                        <p className=''>My account</p>
                    </li>
                </ul>


                {/* Nav item for Medium and Small sized device  */}

                <NavItemForMediumAndSmallerScreen menuBurger={menuBurger} setMenuBurger={setMenuBurger} />


                {/* Nav Menu for Medium and Small sized device */}


            </nav>

            {/* {menuBurger && (<NavMenuForMediumAndSmallerDevice menuBurger={menuBurger} />)} */}
            <NavMenuForMediumAndSmallerDevice menuBurger={menuBurger} />
        </>
    )
}

export default Navbar