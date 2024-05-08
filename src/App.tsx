import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import TV from "./pages/Tv";
import Bookmark from "./pages/Bookmark";
import Details from "./pages/Details";
import LayoutRoute from "./components/ui/LayoutRoute";
import ProtectedRoute from "./components/ui/ProtectedRoute";
import Modal from "react-modal";
import NotFound from "./pages/NotFound";
Modal.setAppElement("#root");
function App() {
  return (
    <div className="bg-darkBlue min-h-[100svh]  text-white">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<LayoutRoute />}>
          <Route element={<Home />} path="/" />
          <Route element={<Movie />} path="/movies" />
          <Route element={<TV />} path="/tv" />
          <Route element={<Details />} path="/:type/:id" />

          {/* Protected Routs */}
          <Route
            element={
              <ProtectedRoute>
                <Bookmark />
              </ProtectedRoute>
            }
            path="/bookmarked"
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
