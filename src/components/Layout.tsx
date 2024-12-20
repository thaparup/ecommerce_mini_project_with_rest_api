import Navbar from "./Navbar/index";
import { Routes, Route } from "react-router-dom";
import { FilterContextProvider } from "../states/context/FilterContext";
import { AddressContextProvider } from "../states/context/AddressContext";
import { CheckoutContextProvider } from "../states/context/CheckoutContext";
import PrivateRoute from "./PrivateRoute";
import { lazy, Suspense } from "react";

const Layout = () => {
  const Register = lazy(() => import("./../pages/Register"));
  const Signin = lazy(() => import("./../pages/Singin"));
  const SingleProduct = lazy(() => import("../pages/SingleProduct"));
  const Cart = lazy(() => import("../pages/Cart"));
  const PaymentSuccess = lazy(() => import("../pages/PaymentSuccess"));
  const ConfirmMethodOfPayment = lazy(
    () => import("../pages/ConfirmMethodOfPayment")
  );
  const CategoryBySlug = lazy(() => import("../pages/CategoryBySlug"));
  const Categories = lazy(() => import("../pages/Categories"));
  const Homepage = lazy(() => import("../pages/Homepage"));
  const Footer = lazy(() => import("./Footer"));

  return (
    <>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <CheckoutContextProvider>
          <AddressContextProvider>
            <Routes>
              <Route element={<PrivateRoute />}>
                <Route path="/success" element={<PaymentSuccess />} />
                <Route path="/cart" element={<Cart />} />
                <Route
                  path="/cart/confirm"
                  element={<ConfirmMethodOfPayment />}
                />
              </Route>
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
              <Route path="/categories/:slug" element={<CategoryBySlug />} />
              <Route path="/products/:id" element={<SingleProduct />} />
            </Routes>
          </AddressContextProvider>
        </CheckoutContextProvider>
        <Footer />
      </Suspense>
    </>
  );
};

export default Layout;
