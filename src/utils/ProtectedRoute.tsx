import { Outlet } from "react-router-dom";
import Navbar from "../components/ui/Navbar";
import { AppDispatch, RootState } from "../state/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchFavoriteMovies,
  fetchFavoriteTV,
} from "../state/auth/bookmarkSlice";

const ProtectedRoute = () => {
  const dispatch: AppDispatch = useDispatch();
  const { sessionId } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (sessionId) {
      dispatch(fetchFavoriteMovies(sessionId));
      dispatch(fetchFavoriteTV(sessionId));
    }
  }, [dispatch, sessionId]);
  return (
    <div className="md:flex md:ml-5 ">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default ProtectedRoute;
