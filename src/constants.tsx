import { PiTelevision } from "react-icons/pi";
import { FaBookmark } from "react-icons/fa6";
import { MdLocalMovies } from "react-icons/md";
import { HiSquares2X2 } from "react-icons/hi2";

export const basic_imageUrl = "https://image.tmdb.org/t/p/original/";
export const navBarItems = [
  {
    id: 0,
    name: <HiSquares2X2 className="md:w-[20px] md:h-[20px]" />,
    url: "/",
  },
  {
    id: 1,
    name: <MdLocalMovies className="md:w-[20px] md:h-[20px]" />,
    url: "/movies",
  },
  {
    id: 2,
    name: <PiTelevision className="md:w-[20px] md:h-[20px]" />,
    url: "/tv",
  },
  {
    id: 3,
    name: <FaBookmark className="md:w-[20px] md:h-[20px]" />,
    url: "/bookmarked",
  },
];
