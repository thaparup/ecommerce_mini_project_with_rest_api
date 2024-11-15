import { useEffect, useState } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { IoPersonOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import NavMenuForMediumAndSmallerDevice from "./NavMenuForMediumAndSmallerDevice";
import { useSelector } from "react-redux";
import { RootState } from "../../states/store/store";

const Navbar: React.FC = () => {
    const [menuBurger, setMenuBurger] = useState(false);
    const [activeLink, setActiveLink] = useState<string>("Shop");

    const cart = useSelector((state: RootState) => state.cart);
    const location = useLocation();

    useEffect(() => {

        setActiveLink(location.pathname)
    }, [location.pathname]);

    return (
        <>
            <nav className="flex justify-between mt-6 mx-12 max-md:hidden">
                <h3 className="text-2xl font-bold leading-0 text-purple-500 ">
                    <span className="text-primaryColor">e</span>Mart
                </h3>
                <ul className="flex gap-4 self-end font-normal relative text-md ">
                    <li
                        className={`after:content-[''] after:rounded-md after:h-1  after:block after:transition-all after:duration-300 after:ease-in-out after:w-2/3 ${activeLink === "/" && "after:w-2/3 after:bg-primaryColor"
                            }`}
                    >
                        <Link to="/">Shop</Link>
                    </li>
                    <li
                        className={`after:content-[''] after:rounded-md after:bg-primaryColor after:h-1 after:w-0 after:block  after:transition-all after:duration-300 after:ease-in-out  ${activeLink === "/categories" && " after:bg-primaryColor after:w-2/3"
                            }`}
                    >
                        <Link to="/categories">Categories</Link>
                    </li>
                    <li
                        className={`after:content-[''] after:rounded-md after:bg-primaryColor after:h-1 after:w-0 after:block after:transition-all after:duration-300 after:ease-in-out ${activeLink === "/register" && "after:w-2/3 after:bg-primaryColor"
                            }`}
                    >
                        <Link to="/register">Register</Link>
                    </li>
                </ul>
                <ul className="flex gap-7 self-end font-normal text-md ">
                    <li className="flex gap-[3px] ">
                        <div className=" flex self-center relative -translate-y-[2px]">
                            <CiShoppingCart
                                size={24}
                                className="self-center text-primaryColor"
                            />
                            <div className="bg-primaryColor h-5 w-5 flex rounded-full absolute top-3 left-3 self-center">
                                <p className="mx-auto self-center text-white text-sm font-medium">
                                    {cart.totalQuantity}
                                </p>
                            </div>
                        </div>
                        <li
                            className={`ml-5 after:content-[''] after:rounded-md after:bg-primaryColor after:h-1 after:w-0 after:block after:transition-all after:duration-300 after:ease-in-out ${activeLink === "/cart" && "after:w-2/3 after:bg-primaryColor"
                                }`}
                        >
                            <Link to="/cart">Cart</Link>
                        </li>
                    </li>
                    <li className="flex gap-[3px] ">
                        <IoPersonOutline
                            size={18}
                            className="self-center text-primaryColor"
                        />
                        <p className="">Sign in</p>
                    </li>
                </ul>
            </nav>

            <NavMenuForMediumAndSmallerDevice
                menuBurger={menuBurger}
                setMenuBurger={setMenuBurger}
            />
        </>
    );
};

export default Navbar;
