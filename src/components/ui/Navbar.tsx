import { MouseEventHandler, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MdMovieCreation } from "react-icons/md";
import { navBarItems } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import { FaBookmark } from "react-icons/fa6";
import { logout } from "../../state/auth/authSlice";

const Navbar = () => {
  const [isOpened, setIsOpened] = useState(false);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { sessionId } = useSelector((state: RootState) => state.auth);
  const logOut: MouseEventHandler<HTMLDivElement> = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <div className="md:pt-8 md:h-full  md:fixed md:top-0 rounded-xl ">
      <div className="md:h-[calc(100svh-3rem)] flex md:flex-col justify-between items-center p-3 md:py-5 md:px-9 bg-semiDarkBlue rounded-lg">
        <NavLink to="/">
          <MdMovieCreation className="text-primaryRed text-xl md:text-2xl" />
        </NavLink>
        <ul className="md:pt-12 flex md:flex-grow md:flex-col md:justify-start justify-center items-center  gap-4 md:gap-9 text-greyishBlue">
          {navBarItems.map((element) => (
            <NavLink
              key={element.id}
              to={element.url}
              className={({ isActive }) =>
                isActive ? "text-white" : "hover:text-primaryRed"
              }
            >
              <li>{element.name}</li>
            </NavLink>
          ))}
          {sessionId && (
            <NavLink
              to="/bookmarked"
              className={({ isActive }) =>
                isActive ? "text-white" : "hover:text-primaryRed"
              }
            >
              <FaBookmark className="text-xl md:text-2xl" />
            </NavLink>
          )}
        </ul>
        <div
          className="w-6 h-6 rounded-full bg-white cursor-pointer select-none"
          onClick={() => setIsOpened((prev) => !prev)}
        ></div>
      </div>
      {isOpened && (
        <>
          {sessionId ? (
            <div
              className="absolute right-0 md:left-0 md:bottom-20   bg-semiDarkBlue w-18 md:w-20 h-10 mx-auto py-2 px-3 text-center cursor-pointer"
              onClick={logOut}
            >
              <p className="hover:text-primaryRed">Logout</p>
            </div>
          ) : (
            <NavLink to={"/login"}>
              <div className="absolute right-0 md:left-0 md:bottom-20  bg-semiDarkBlue w-18 md:w-20 h-10 mx-auto text-center py-2 px-3 cursor-pointer">
                <p className="hover:text-primaryRed">Login</p>
              </div>
            </NavLink>
          )}
        </>
      )}
    </div>
  );
};

export default Navbar;
