import { PiTelevision } from "react-icons/pi";
import { MdLocalMovies } from "react-icons/md";
import { PiSquaresFourFill } from "react-icons/pi";
import { ApiDetails } from "./types";

export const basic_imageUrl =
  "https://image.tmdb.org/t/p/w533_and_h300_bestv2/";
export const navBarItems = [
  {
    id: 0,
    name: <PiSquaresFourFill className="text-xl md:text-2xl" />,
    url: "/",
    arialLabeL: "home-link-page",
  },
  {
    id: 1,
    name: <MdLocalMovies className="text-xl md:text-2xl" />,
    url: "/movies",
    arialLabeL: "movie-link-page",
  },
  {
    id: 2,
    name: <PiTelevision className="text-xl md:text-2xl" />,
    url: "/tv",
    arialLabeL: "tv-link-page",
  },
];

export const initialMovieDetails: ApiDetails = {
  adult: false,
  backdrop_path: "",
  overview: "",
  popularity: 0,
  poster_path: "",
  genres: [
    {
      id: 0,
      name: "",
    },
  ],
  name: "",
  original_name: "",
  type: "",
  id: 0,
  original_title: "",
  title: "",
};
