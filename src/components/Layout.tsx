
import Navbar from "./Navbar/index";
import { Routes, Route, useLocation } from "react-router-dom";
import Register from "../pages/Register";
import Categories from "../pages/Categories";




const Layout = () => {

  const location = useLocation();



  return <>
    {location.pathname !== '/register' && <Navbar />}
    <Routes>
      <Route path='/register' element={<Register />} />
      <Route path='/categories' element={<Categories />} />
    </Routes>
  </>;
};

export default Layout;
