import { Link } from "react-router-dom";
export default function Footer() {
    return (
        <footer className="bg-gradient-to-r from-primaryColor to-purple-500 ">
            <section className="text-white text-sm py-8 flex  lg:flex-nowrap xs:flex-wrap sm:flex-wrap">
                <div className="flex flex-col font-medium w-1/4 sm:w-2/4 xs:w-full xs:text-center sm:text-center">
                    <h3 className="font-medium underline">ABOUT</h3>
                    <Link to="" className="mt-3 hover:underline">
                        Contact Us
                    </Link>
                    <Link to="" className="hover:underline">
                        About Us
                    </Link>
                    <Link to="" className="hover:underline">
                        Caarers
                    </Link>
                    <Link to="" className="hover:underline">
                        Press
                    </Link>
                    <Link to="" className="hover:underline">
                        Blog
                    </Link>
                </div>
                <div className="flex flex-col font-medium w-1/4 sm:w-2/4 xs:w-full xs:text-center sm:text-center xs:mt-8 sm:mt-0">
                    <h3 className="font-medium underline">Help</h3>
                    <Link to="" className="mt-3 hover:underline">
                        Payment
                    </Link>
                    <Link to="" className="hover:underline">
                        Shipping{" "}
                    </Link>
                    <Link to="" className="hover:underline">
                        Cancellation
                    </Link>
                    <Link to="" className="hover:underline">
                        {" "}
                        Returns
                    </Link>
                    <Link to="" className="hover:underline">
                        FAQ
                    </Link>
                </div>
                <div className="flex flex-col font-medium w-1/4 sm:w-2/4 xs:w-full  xs:text-center sm:text-center xs:mt-8 sm:mt-8 md:mt-8  lg:mt-0">
                    <h3 className="font-medium underline"> CONSUMER POLICY</h3>
                    <Link to="" className="mt-3 hover:underline">
                        Cancellation & Returns
                    </Link>
                    <Link to="" className="hover:underline">
                        Terms Of Use
                    </Link>
                    <Link to="" className="hover:underline">
                        Security
                    </Link>
                    <Link to="" className="hover:underline">
                        Privacy
                    </Link>
                    <Link to="" className="hover:underline">
                        Code Of Conduct
                    </Link>
                </div>

                <div className="flex flex-col font-lightw-1/4 sm:w-2/4 xs:w-full xs:text-center sm:text-center xs:mt-8  sm:mt-8  md:mt-8 lg:mt-0">
                    <h3 className="font-medium underline">Mail Us</h3>
                    <h3 className="mt-3">Emart Privated Limited,</h3>
                    <h3>Buildings Krishna Tower &</h3>
                    <h3>Rooftop Tech Store,</h3>
                    <h3>Happy Plaza TwinTower,</h3>
                    <h3>Pokhara, 0337000</h3>
                    <h3>Nepal</h3>
                </div>
            </section>
            <div className="text-center -translate-y-4 border-t border-white/20 text-sm">
                <p className="text-white font-medium mt-1">
                    &copy; {new Date().getFullYear()} Emart. All Rights Reserved.
                </p>
            </div>
        </footer>
    );
}

