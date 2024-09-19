import { useEffect, useState } from "react"
import { CiLineHeight, CiShoppingCart } from "react-icons/ci"
import { IoPersonOutline } from "react-icons/io5"
import { Link } from "react-router-dom"


interface NavbarProps {

}
const Navbar: React.FC<NavbarProps> = () => {

    const [width, setWidth] = useState(window.innerWidth)
    const [counter, setCounter] = useState(0)
    const [menuBurger, setMenuBurger] = useState(false)

    function handle() {
        setCounter((prev) => prev + 1)
        console.log("The window is resized", counter)
    }

    useEffect(() => {

        window.addEventListener('resize', handle)
    }, [])
    return (
        <>

            <nav className='flex justify-between mt-6'>
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


                {/*   mobile nav section */}

                <div className='flex min-[768px]:hidden gap-4'>


                    <li className=" flex self-center relative">
                        <CiShoppingCart size={24} className='self-center text-primaryColor' />
                        <div className='bg-primaryColor h-5 w-5 flex rounded-full absolute top-3 left-3'>
                            <p className='mx-auto self-center text-white text-sm'>0</p>
                        </div>

                    </li>

                    <div className={` flex gap-1 flex-col my-auto ${menuBurger && 'gap-0'}`} onClick={() => setMenuBurger(true)}>
                        <div className={` bg-black w-7 h-1 rounded-md ${menuBurger && 'rotate-45 transition-all duration-300 ease-out'}`}></div>
                        <div className={`bg-black w-7 h-1 rounded-md ${menuBurger && 'rotate-[-45deg] -translate-y-[0.245rem] transition-all duration-300 ease-out'}`}></div>
                        <div className={` ${menuBurger ? 'hidden' : 'bg-black w-7 h-1 rounded-md'}`}></div>
                    </div>
                </div>
                {menuBurger && (
                    <div className="bg-red-400 fixed w-screen h-screen p-0 m-0">
                        sdfdsf
                    </div>
                )}
            </nav >
            <h1 className='text-5xl mt-96 ml-96'>{window.innerWidth}</h1>
        </>

    )
}
export default Navbar