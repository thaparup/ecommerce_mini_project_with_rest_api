import React from "react";
import Navbar from "./Navbar/index";
import { Routes, Route, useLocation } from "react-router-dom";
import Register from "../pages/Register";
import { Toaster } from "./ui/sonner"



const Layout = () => {
  const location = useLocation();
  return <>
    <Toaster />
    {location.pathname !== "/register" && <Navbar />}
    <Routes>
      <Route path='/register' element={<Register />} />
    </Routes>
  </>;
};

export default Layout;
