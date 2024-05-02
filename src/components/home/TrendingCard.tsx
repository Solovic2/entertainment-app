import { FC } from "react";
import { ApiMovie } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import { FaBookmark, FaPlayCircle, FaRegBookmark } from "react-icons/fa";
import { PiTelevision } from "react-icons/pi";
import { MdLocalMovies } from "react-icons/md";
import { updateBookmark } from "../../state/auth/bookmarkSlice";
import { basic_imageUrl } from "../../constants";

interface TrendingCard {
  movie: ApiMovie;
}
const TrendingCard: FC<TrendingCard> = ({ movie }) => {
  const { bookmarks } = useSelector((state: RootState) => state.bookmark);
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
  } = movie;
  const date = first_air_date?.substring(0, 4) || release_date?.substring(0, 4);
  const typeMedia =
    (movie_type || media_type) === "tv" ? <PiTelevision /> : <MdLocalMovies />;

  const image: string = backdrop_path
    ? basic_imageUrl + backdrop_path
    : poster_path
    ? basic_imageUrl + poster_path
    : "/assets/placeholder-image.png";

  const isBookmarked = bookmarks.find((element) => element.id === movie.id);
  const handleBookmark = () => {
    dispatch(updateBookmark(movie));
  };
  return (
    <div key={movie.id} className="h-full w-full">
      <div
        className={`relative overflow-hidden cursor-pointer  bg-opacity-80  rounded-lg  `}
      >
        <div className="opacity-0 hover:opacity-100 select-none absolute flex justify-center items-center w-full h-full bg-greyishBlue bg-opacity-30  ">
          <div className="flex justify-center items-center gap-3 md:gap-4 opacity-100 bg-greyishBlue py-3 px-4 rounded-full">
            <FaPlayCircle size={30} color="#fff" />
            <p className="text-bodyM md:text-headingXs">Play</p>
          </div>
        </div>
        <div className="h-[230px]">
          <img
            src={image}
            className="object-cover select-none hover:opacity-30 rounded-lg h-full w-full"
            alt={name || title}
          />
        </div>
        {/*  Bookmark */}
        <div
          className="absolute top-0 right-0 m-2 w-8 h-8 rounded-full p-2 bg-greyishBlue hover:bg-white hover:text-darkBlue cursor-pointer"
          onClick={handleBookmark}
        >
          {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
        </div>
        {/* Put Title inside Card */}
        <div className="absolute bottom-0 p-5">
          <div className="text-[12px] opacity-75 flex  gap-2">
            <span>{date}</span>
            <span>.</span>
            <p className="flex items-center gap-1 capitalize">
              {typeMedia}
              {(movie_type || media_type) === "tv"
                ? "TV"
                : movie_type || media_type}
            </p>
          </div>
          <p className="mt-1 text-[15px]">{title}</p>
        </div>
      </div>
    </div>
  );
};

export default TrendingCard;
