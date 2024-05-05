import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import TV from "./pages/Tv";
import Bookmark from "./pages/Bookmark";
import Details from "./pages/Details";
import LayoutRoute from "./components/LayoutRoute";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="bg-darkBlue min-h-[100svh]  text-white">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />

        {/* Protected Routs */}
        <Route path="/" element={<LayoutRoute />}>
          <Route element={<Home />} path="/" />
          <Route element={<Movie />} path="/movies" />
          <Route element={<TV />} path="/tv" />

          <Route
            element={
              <ProtectedRoute>
                <Bookmark />
              </ProtectedRoute>
            }
            path="/bookmarked"
          />

          <Route element={<Bookmark />} path="/bookmarked" />
          <Route element={<Details />} path="/:type/:id" />

          {/* <Route element={<Home />} path="/" /> */}
        </Route>

        {/* <Route path="/:id" element={<Details />} />
        <Route path="/:id/apply" element={<Form />} /> */}
      </Routes>
    </div>
  );
}

export default App;
