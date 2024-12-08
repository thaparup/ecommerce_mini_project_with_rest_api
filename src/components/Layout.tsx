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
import PrivateRoute from "./PrivateRoute";
import Signin from "../pages/Singin";

const Layout = () => {
  const location = useLocation();

  return (
    <>
      {/* {location.pathname !== "/auth/register" && <Navbar />} */}
      <Navbar />
      <CheckoutContextProvider>
        <AddressContextProvider>
          <Routes>
            <Route element={<PrivateRoute />}>

              <Route path="/success" element={<PaymentSuccess />} />

              <Route path="/cart" element={<Cart />} />
              <Route path="/cart/confirm" element={<ConfirmMethodOfPayment />} />
            </Route>
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
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/signin" element={<Signin />} />
        <Route path="/categories" element={<Categories />} />
      </Routes>
    </>
  );
};

export default Layout;
