import { FC } from "react";
import { ApiMovie } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { PiTelevision } from "react-icons/pi";
import { MdLocalMovies } from "react-icons/md";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { basic_imageUrl } from "../../constants";
import { NavLink } from "react-router-dom";
import Image from "../shared/Image";
import { updateBookmark } from "../../state/auth/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface TrendingCard {
  movie: ApiMovie;
}
const TrendingCard: FC<TrendingCard> = ({ movie }) => {
  const { bookmarks, sessionId } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch: AppDispatch = useDispatch();
  const {
    name,
    title,
    backdrop_path,
    poster_path,
    movie_type,
    media_type,
    first_air_date,
    release_date,
    adult,
  } = movie;

  // Card Date
  const date = first_air_date?.substring(0, 4) || release_date?.substring(0, 4);

  // Card Media Type
  const typeMedia =
    (movie_type || media_type) === "tv" ? <PiTelevision /> : <MdLocalMovies />;

  // Link Slug For Details
  const cardLink: string =
    (movie_type || media_type) === "tv"
      ? `${`/tv/${movie.id}`}`
      : `${`/${movie_type || media_type}/${movie.id}`}`;

  // Card Image
  const image: string = backdrop_path
    ? basic_imageUrl + backdrop_path
    : poster_path
    ? basic_imageUrl + poster_path
    : "/assets/placeholder-image.png";

  // Adult Type
  const adultType: string = adult ? "+18" : "PG";

  // Bookmark
  const isBookmarked = bookmarks.find((element) => element.id === movie.id);
  const handleBookmark = () => {
    if (!sessionId) toast.warning(`Please login first to do this action`);
    else dispatch(updateBookmark(movie));
  };
  return (
    <div key={movie.id} className="relative h-full w-full ">
      <NavLink to={cardLink}>
        <div
          className={`relative overflow-hidden cursor-pointer  bg-opacity-80  rounded-lg  `}
        >
          <div className="z-40 opacity-0 hover:opacity-100 select-none absolute flex justify-center items-center w-full h-full bg-greyishBlue bg-opacity-30  ">
            <div className="flex justify-center items-center gap-2 opacity-100 bg-greyishBlue py-3 px-4 rounded-full">
              <IoIosInformationCircleOutline size={30} color="#fff" />
              <p className="text-bodyM md:text-headingXs">More Info</p>
            </div>
          </div>

          <div className="h-[230px] ">
            <Image
              src={image}
              className="z-10 object-cover select-none hover:opacity-30 rounded-lg h-full w-full inset-0 bg-gradient-to-b from-transparent to-black"
              alt={name || title}
            />

            <div className="z-20 absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"></div>
          </div>

          {/* Put Title inside Card */}
          <div className="z-30 absolute bottom-0 p-5">
            <div className="text-[12px] md:text-bodyM opacity-75 flex items-center gap-2 font-outfitLight ">
              <span>{date}</span>
              <span className="w-1 h-1 rounded-full bg-white"></span>
              <p className="flex items-center gap-1 capitalize ">
                {typeMedia}
                {(movie_type || media_type) === "tv"
                  ? "TV"
                  : movie_type || media_type}
              </p>
              <span className="w-1 h-1 rounded-full bg-white"></span>
              <p>{adultType}</p>
            </div>
            <p className="mt-1 text-bodyM md:text-headingM font-outfitMedium">
              {title || name}
            </p>
          </div>
        </div>
      </NavLink>
      {/*  Bookmark */}
      <div
        className="z-50 absolute top-0 right-0 m-2 w-8 h-8 rounded-full p-2 bg-greyishBlue hover:bg-white hover:text-darkBlue cursor-pointer"
        onClick={handleBookmark}
      >
        {isBookmarked && sessionId ? <FaBookmark /> : <FaRegBookmark />}
      </div>
    </div>
  );
};

export default TrendingCard;
