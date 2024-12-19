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
import CategoryBySlug from "../pages/CategoryBySlug";
import SingleProduct from "../pages/SingleProduct";
import Footer from "./Footer";
import { lazy, Suspense } from "react";
import ProductSkeleton from "./ProductSkeleton";


const Layout = () => {
  const Register = lazy(() => import('./../pages/Register'))
  const Signin = lazy(() => import('./../pages/Singin'))
  const SingleProduct = lazy(() => import('../pages/SingleProduct'))
  const Cart = lazy(() => import('../pages/Cart'))
  const PaymentSuccess = lazy(() => import('../pages/PaymentSuccess'))
  const ConfirmMethodOfPayment = lazy(() => import('../pages/ConfirmMethodOfPayment'))
  const CategoryBySlug = lazy(() => import('../pages/CategoryBySlug'))
  const Categories = lazy(() => import('../pages/Categories'))
  const Homepage = lazy(() => import('../pages/Homepage'))
  const Footer = lazy(() => import('./Footer'))

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
                <Route path="/cart/confirm" element={<ConfirmMethodOfPayment />} />
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
