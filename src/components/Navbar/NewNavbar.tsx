import React from "react";
import { CiLogout, CiShoppingCart } from "react-icons/ci";
import { IoPersonOutline } from "react-icons/io5";

interface NewNavbarProps {
    menuBurger: boolean;
    setMenuBurger: React.Dispatch<React.SetStateAction<boolean>>;
}
const NewNavbar: React.FC<NewNavbarProps> = ({ menuBurger, setMenuBurger }) => {
    return (
        <div className="relative">
            <nav className={` flex md:hidden justify-between list-none mt-6 ${menuBurger && ''}`}>
                <li className="">
                    <h3 className="text-2xl font-bold leading-0 text-primaryColor ">
                        Ecomm
                    </h3>
                </li>
                <li className="flex gap-5">
                    <div className=" flex self-center relative ">
                        <CiShoppingCart
                            size={24}
                            className="self-center text-primaryColor"
                        />
                        <div className="bg-primaryColor h-5 w-5 flex rounded-full absolute top-3 left-3">
                            <p className="mx-auto self-center text-white text-sm">0</p>
                        </div>
                    </div>

                    <div
                        className={` flex gap-1 flex-col my-auto w-7 cursor-pointer ${menuBurger && "gap-0 relative"
                            }`}
                        onClick={() => setMenuBurger(true)}
                    >
                        <div
                            className={` bg-black w-7 h-1 rounded-md ${menuBurger &&
                                " absolute  rotate-45 transition-all duration-300 ease-out"
                                }`}
                        ></div>
                        <div
                            className={`bg-black w-7 h-1 rounded-md ${menuBurger &&
                                "absolute rotate-[-45deg] transition-all duration-300 ease-out"
                                }`}
                        ></div>
                        <div
                            className={` ${menuBurger ? "hidden" : "bg-black w-7 h-1 rounded-md"
                                }`}
                        ></div>
                    </div>
                </li>
            </nav>


            <nav
                className={`fixed top-0 left-0 h-screen  transition-all duration-500 ease-in-out bg-primaryColor text-white  ${menuBurger ? "w-screen " : "w-0 overflow-hidden -translate-x-32"
                    }`}
            >
                <div className='flex justify-end'>

                    <button className='mt-3 mr-3 font-medium text-xl' onClick={() => setMenuBurger(false)}>X</button>
                </div>
                <h3 className="text-2xl font-bold leading-0  text-center">Ecomm</h3>


                <ul className=''>
                    <li className='flex justify-between my-2 mx-3 font-medium'>
                        <h3>Name</h3>
                        <IoPersonOutline size={18} className="self-center " />

                    </li>
                    <hr />
                    <li className='flex justify-between my-2 mx-3 font-medium'>
                        <h3>Cart</h3>
                        {/* <CiShoppingCart size={20} className='self-center text-primaryColor' /> */}
                        <div className=" flex self-center relative">
                            <CiShoppingCart size={24} className='self-center' />
                            <div className='bg-primaryColor h-5 w-5 flex rounded-full absolute top-3 left-3'>
                                <p className='mx-auto self-center text-white text-sm'>0</p>
                            </div>

                        </div>

                    </li>
                    <hr />
                    <li className='flex justify-between my-2 mx-2 font-medium'>
                        <h3>Logout</h3>
                        <CiLogout size={24} className='self-center' />

                    </li>
                    <hr />
                </ul>

            </nav>

        </div>
    );
};

export default NewNavbar;
