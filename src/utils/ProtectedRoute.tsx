import { Outlet } from "react-router-dom";
import Navbar from "../components/ui/Navbar";

const ProtectedRoute = () => {
  return (
    <div className="md:flex md:ml-5 ">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default ProtectedRoute;
