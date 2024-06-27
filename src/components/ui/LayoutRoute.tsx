import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar";
const LayoutRoute = () => {
  return (
    <div className="md:flex md:ml-5 ">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default LayoutRoute;
