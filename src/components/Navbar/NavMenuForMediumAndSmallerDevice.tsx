import { useEffect } from "react";
import { CiLogout, CiShoppingCart } from "react-icons/ci";
import { LiaTimesSolid } from "react-icons/lia";
import { Link, } from "react-router-dom";
import { useIsTokenExpired } from "../../hooks/useIsTokenExpired";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../states/store/store";
import { logout } from "../../states/store/slices/AuthSlice";

interface NavMenuForMediumAndSmallerDeviceProps {
    menuBurger: boolean;
    setMenuBurger: React.Dispatch<React.SetStateAction<boolean>>;
}
const NavMenuForMediumAndSmallerDevice: React.FC<
    NavMenuForMediumAndSmallerDeviceProps
> = ({ menuBurger, setMenuBurger }) => {
    useEffect(() => {
        if (menuBurger) document.body.style.overflowY = "hidden";
        if (!menuBurger) document.body.style.overflowY = "scroll";
        return () => {
            document.body.style.overflowY = "scroll";
        };
    }, [menuBurger]);
    const tq = useSelector((state: RootState) => state.cart.totalQuantity)
    const isTokenExpired = useIsTokenExpired();
    const dispatch = useDispatch()
    const auth = useSelector((state: RootState) => state.auth.auth)
    const handleClick = () => {
        setMenuBurger(false)
    }
    return (
        <div className="relative mx-8 ">
            <nav
                className={` flex md:hidden justify-between list-none mt-6 ${menuBurger && ""
                    }`}
            >
                <li className="">
                    <h3 className="text-2xl font-bold leading-0 text-primaryColor ">
                        eMart
                    </h3>
                </li>
                <li className="flex gap-5">
                    <div className=" flex self-center relative ">
                        <CiShoppingCart
                            size={24}
                            className="self-center text-primaryColor"
                        />
                        <div className="bg-primaryColor h-5 w-5 flex rounded-full absolute top-3 left-3">
                            <p className="mx-auto self-center text-white text-sm">{tq}</p>
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
                className={`fixed top-0 left-0 h-screen  transition-all duration-500 ease-in-out bg-primaryColor text-white z-50 ${menuBurger ? "w-screen " : "w-0 overflow-hidden -translate-x-32"
                    }`}
            >
                <div className="flex justify-end">
                    <button
                        className="mt-3 mr-3 font-medium text-xl"
                        onClick={() => setMenuBurger(false)}
                    >
                        <LiaTimesSolid size={24} />
                    </button>
                </div>
                <h3 className="text-2xl font-bold leading-0  text-center">eMart</h3>

                <ul className="">
                    <li className="flex justify-between my-2 mx-3 font-medium" onClick={handleClick}>
                        <Link to="/">Home</Link>
                    </li>
                    <hr />

                    <li className="flex justify-between my-2 mx-3 font-medium" onClick={handleClick}>
                        <Link to="/categories">Categories</Link>
                    </li>
                    <hr />
                    <li className="flex justify-between my-2 mx-3 font-medium" onClick={handleClick}>
                        <Link to="/auth/register">Register</Link>
                    </li>
                    <hr />

                    <li className="flex justify-between my-2 mx-3 font-medium" onClick={handleClick}>
                        <Link to='/cart' className="flex justify-between  w-full">
                            <h3>Cart</h3>
                            {/* <CiShoppingCart size={20} className='self-center text-primaryColor' /> */}
                            <div className=" flex self-center relative">
                                <CiShoppingCart size={24} className="self-center" />
                                <div className="bg-primaryColor h-5 w-5 flex rounded-full absolute top-3 left-3">
                                    <p className="mx-auto self-center text-white text-sm">{tq}</p>
                                </div>
                            </div>
                        </Link>
                    </li>
                    <hr />

                    {isTokenExpired ? (
                        <li className="flex justify-between my-2 mx-3 font-medium" onClick={handleClick}>
                            <Link to='/auth/signin' className="flex justify-between  w-full">
                                <h3>Sign In</h3>
                                <div className=" flex self-center relative">
                                    <CiLogout size={24} className="self-center" />

                                </div>
                            </Link>
                        </li>
                    ) : (
                        <>
                            <li className="flex justify-between my-2 mx-3 font-medium" >
                                <h3 className="font-medium">{auth.name}</h3>
                            </li>
                            <hr />
                            <li className="flex justify-between my-2 mx-3 font-medium">
                                <h3 className="font-medium">{auth.email}</h3>
                            </li>
                            <hr />

                            <li className="flex justify-between my-2 mx-2 font-medium" onClick={() => {
                                dispatch(logout())
                                setMenuBurger(false)
                            }}>
                                <h3>Logout</h3>
                                <CiLogout size={24} className="self-center" />
                            </li>
                            <hr />
                        </>
                    )}

                    <hr />
                </ul>
            </nav>
        </div>
    );
};

export default NavMenuForMediumAndSmallerDevice;
