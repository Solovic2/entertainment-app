import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { Navigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";
interface ProtectedRouteProp {
  children: ReactNode;
}
const ProtectedRoute = ({ children }: ProtectedRouteProp) => {
  const { sessionId } = useSelector((state: RootState) => state.auth);
  let location = useLocation();
  if (!sessionId)
    return <Navigate to="/login" state={{ from: location }} replace />;
  return <>{children}</>;
};

export default ProtectedRoute;
