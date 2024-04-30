import { useState } from "react";
import { NavLink } from "react-router-dom";
import { PiTelevision } from "react-icons/pi";
import { FaBookmark } from "react-icons/fa6";
import { MdLocalMovies } from "react-icons/md";
import { MdMovieCreation } from "react-icons/md";

const Navbar = () => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div className="md:pt-8 md:h-full relative md:fixed md:top-0 left-5">
      <div className="md:h-[calc(100svh-2rem)] flex md:flex-col justify-between items-center p-3 md:py-5 bg-semiDarkBlue">
        <MdMovieCreation className="text-primaryRed w-6 h-6 " />
        <ul className="md:py-8 flex md:flex-grow md:flex-col md:justify-start justify-center items-center  gap-4 md:gap-9 text-greyishBlue">
          <NavLink to={"/"}>
            <li>Home</li>
          </NavLink>
          <NavLink to={"/movies"}>
            <li>
              <MdLocalMovies className="md:w-[20px] md:h-[20px]" />
            </li>
          </NavLink>
          <NavLink to={"/tv"}>
            <li>
              <PiTelevision className="md:w-[20px] md:h-[20px]" />
            </li>
          </NavLink>
          <NavLink to={"/bookmarked"}>
            <li>
              <FaBookmark className="md:w-[20px] md:h-[20px]" />
            </li>
          </NavLink>
        </ul>
        <div
          className="w-6 h-6 rounded-full bg-white cursor-pointer"
          onClick={() => setIsOpened((prev) => !prev)}
        ></div>
      </div>
      {isOpened && (
        <div className="absolute right-0 md:left-16 md:bottom-1  bg-semiDarkBlue w-18 md:w-20 h-10 mx-auto py-2 px-3">
          <NavLink to={"/login"}>
            <p className="hover:text-primaryRed">Logout</p>
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Navbar;
