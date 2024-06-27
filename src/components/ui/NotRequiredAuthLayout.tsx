import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { Navigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";
interface NotRequiredAuthLayoutProps {
  children: ReactNode;
}
const NotRequiredAuthLayout = ({ children }: NotRequiredAuthLayoutProps) => {
  const { sessionId } = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  if (sessionId) return <Navigate to="/" state={{ from: location }} replace />;
  return <>{children}</>;
};

export default NotRequiredAuthLayout;
