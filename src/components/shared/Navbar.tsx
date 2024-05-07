import { MouseEventHandler, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MdMovieCreation } from "react-icons/md";
import { navBarItems } from "../../constants";
import { AppDispatch, RootState } from "../../state/store";
import { useDispatch, useSelector } from "react-redux";
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
        <NavLink to="/" aria-label="home-page-link">
          <MdMovieCreation className="text-primaryRed text-xl md:text-2xl" />
        </NavLink>
        <ul className="md:pt-12 flex md:flex-grow md:flex-col md:justify-start justify-center items-center  gap-4 md:gap-9 text-greyishBlue">
          {navBarItems.map((element) => (
            <li>
              <NavLink
                key={element.id}
                to={element.url}
                aria-label={element.arialLabeL}
                className={({ isActive }) =>
                  isActive ? "text-white" : "hover:text-primaryRed"
                }
              >
                {element.name}
              </NavLink>
            </li>
          ))}
          {sessionId && (
            <li>
              <NavLink
                to="/bookmarked"
                className={({ isActive }) =>
                  isActive ? "text-white" : "hover:text-primaryRed"
                }
                aria-label="bookmark-page-link"
              >
                <FaBookmark className="text-xl md:text-2xl" />
              </NavLink>
            </li>
          )}
        </ul>
        <div
          role="login-click"
          className={`w-8 h-8 rounded-full bg-primaryRed  cursor-pointer select-none`}
          onClick={() => setIsOpened((prev) => !prev)}
          aria-label="login-image"
        >
          {sessionId && (
            <img
              className="object-cover h-full w-full rounded-full"
              src="/assets/placeholder-user-image.jpg"
              alt="user-image"
            />
          )}
        </div>
      </div>
      {isOpened && (
        <>
          {sessionId ? (
            <div
              className="absolute right-0 md:left-0 md:bottom-20 md:mb-3 bg-white text-black font-outfitMedium rounded-bl-sm md:rounded-md w-20 h-10 mx-auto text-center  py-2 px-3 cursor-pointer md:after:content-[''] md:after:border-[10px] md:after:mt-5 md:after:absolute md:after:top-[50%] md:after:left-[30px] md:after:border-transparent md:after:border-t-white md:after:text-white"
              onClick={logOut}
              role="logOut-click"
            >
              <p className="hover:text-primaryRed">Logout</p>
            </div>
          ) : (
            <NavLink to={"/login"} aria-label="login-page-link">
              <div className="absolute right-0 md:left-0 md:bottom-20 md:mb-3 bg-white text-black font-outfitMedium rounded-bl-sm md:rounded-md w-20 h-10 mx-auto text-center py-2 px-3 cursor-pointer md:after:content-[''] md:after:border-[10px] md:after:mt-5 md:after:absolute md:after:top-[50%] md:after:left-[30px] md:after:border-transparent md:after:border-t-white md:after:text-white">
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
