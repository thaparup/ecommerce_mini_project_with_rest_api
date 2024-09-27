
import Navbar from "./Navbar/index";
import { Routes, Route, useLocation } from "react-router-dom";
import Register from "../pages/Register";




const Layout = () => {

  const location = useLocation();



  return <>
    {location.pathname !== '/register' && <Navbar />}
    <Routes>
      <Route path='/register' element={<Register />} />
    </Routes>
  </>;
};

export default Layout;
