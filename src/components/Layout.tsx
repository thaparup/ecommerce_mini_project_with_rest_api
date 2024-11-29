import Navbar from "./Navbar/index";
import { Routes, Route, useLocation } from "react-router-dom";
import Register from "../pages/Register";
import Categories from "../pages/Categories";
import Homepage from "../pages/Homepage";
import { FilterContextProvider } from "../states/context/FilterContext";
import Cart from "../pages/Cart";
import PaymentSuccess from "../pages/PaymentSuccess";
import ConfirmMethodOfPayment from "../pages/ConfirmMethodOfPayment";

const Layout = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/register" && <Navbar />}
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
        <Route path="/cart" element={<Cart />} />
        <Route path="/success" element={<PaymentSuccess />} />
        <Route path="/cart/confirm" element={<ConfirmMethodOfPayment />} />
      </Routes>
    </>
  );
};

export default Layout;
