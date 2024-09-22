import { useState } from "react"
import { CiShoppingCart } from "react-icons/ci"
import { IoPersonOutline } from "react-icons/io5"
import { Link } from "react-router-dom"
import NavMenuForMediumAndSmallerDevice from "./NavMenuForMediumAndSmallerDevice"

interface NavbarProps {

}
const Navbar: React.FC<NavbarProps> = () => {

    const [menuBurger, setMenuBurger] = useState(false)
    const [activeLink, setActiveLink] = useState<string>('Shop')


    return (
        <>
            <nav className="flex justify-between mt-6 max-md:hidden">
                <h3 className="text-2xl font-bold leading-0 text-primaryColor ">Ecomm</h3>
                <ul className='flex gap-4 self-end font-normal relative text-md '>
                    <li className={`after:content-[''] after:h-1  after:block after:hover:w-0 after:transition-all after:duration-300 after:ease-in-out  ${activeLink === 'Shop' && 'after:w-full after:bg-primaryColor'}`}><Link
                        to=''>Shop</Link></li>
                    <li className={`after:content-[''] after:bg-primaryColor after:h-1 after:w-0 after:block hover:after:w-full after:transition-all after:duration-300 after:ease-in-out ${activeLink === 'Categories' && 'after:w-full after:bg-primaryColor'}`} onMouseEnter={() => setActiveLink('Categories')} onMouseLeave={() => setActiveLink('Shop')}><Link to='/register' >Categories</Link></li>
                    <li className={`after:content-[''] after:bg-primaryColor after:h-1 after:w-0 after:block hover:after:w-full after:transition-all after:duration-300 after:ease-in-out ${activeLink === 'Register' && 'after:w-full after:bg-primaryColor'}`} onMouseEnter={() => setActiveLink('Register')} onMouseLeave={() => setActiveLink('Shop')}><Link to='/register' >Register</Link></li>
                </ul>
                <ul className='flex gap-7 self-end font-normal text-md '>
                    <li className="flex gap-[3px] ">
                        <CiShoppingCart size={20} className='self-center text-primaryColor' />
                        <p>Cart</p>
                        <p className='text-primaryColor'>0</p>
                    </li>
                    <li className='flex gap-[3px] '>
                        <IoPersonOutline size={18} className="self-center text-primaryColor" />
                        <p className=''>Sign in</p>
                    </li>
                </ul>




            </nav>

            <NavMenuForMediumAndSmallerDevice menuBurger={menuBurger} setMenuBurger={setMenuBurger} />
        </>
    )
}

export default Navbar