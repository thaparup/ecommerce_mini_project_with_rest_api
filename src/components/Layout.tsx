import Navbar from "./Navbar/index";
import { Routes, Route, useLocation } from "react-router-dom";
import Register from "../pages/Register";
import Categories from "../pages/Categories";
import Homepage from "../pages/Homepage";
import { FilterContextProvider } from "../states/context/FilterContext";
import Cart from "../pages/Cart";
import PaymentSuccess from "../pages/PaymentSuccess";
import ConfirmMethodOfPayment from "../pages/ConfirmMethodOfPayment";
import { AddressContextProvider } from "../states/context/AddressContext";
import { CheckoutContextProvider } from "../states/context/CheckoutContext";

const Layout = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/register" && <Navbar />}
      <CheckoutContextProvider>
        <AddressContextProvider>

          <Routes>

            <Route path="/success" element={<PaymentSuccess />} />

            <Route path="/cart" element={<AddressContextProvider><Cart /></AddressContextProvider>} />
            <Route path="/cart/confirm" element={<AddressContextProvider><ConfirmMethodOfPayment /></AddressContextProvider>} />
          </Routes>
        </AddressContextProvider>

      </CheckoutContextProvider>
      <Routes>


        <Route
          path="/"
          element={
            <FilterContextProvider>
              <Homepage />
            </FilterContextProvider>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/categories" element={<Categories />} />
        {/* <Route path="/success" element={<PaymentSuccess />} /> */}


      </Routes>
    </>
  );
};

export default Layout;
