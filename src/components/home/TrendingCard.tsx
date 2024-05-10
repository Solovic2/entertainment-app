import { FC } from "react";
import { MediaCardProp } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { PiTelevision } from "react-icons/pi";
import { MdLocalMovies } from "react-icons/md";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { NavLink } from "react-router-dom";
import Image from "../shared/Image";
import { updateBookmark } from "../../state/auth/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface TrendingCard {
  movie: MediaCardProp;
}
const TrendingCard: FC<TrendingCard> = ({ movie }) => {
  const { bookmarks, sessionId } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch: AppDispatch = useDispatch();
  const { date, image, title, media_type, adult, cardLink } = movie;

  // Card Media Type
  const typeMedia = media_type === "tv" ? <PiTelevision /> : <MdLocalMovies />;

  // Bookmark
  const isBookmarked = bookmarks.find((element) => element.id === movie.id);
  const handleBookmark = () => {
    if (!sessionId)
      toast.warning(
        <>
          Please{" "}
          <NavLink to="/login" className="text-primaryRed">
            Login
          </NavLink>{" "}
          first to do this action
        </>
      );
    else {
      if (isBookmarked) {
        toast.info(<>Successfully un bookmarked {media_type}!</>);
      } else {
        toast.success(<>Successfully bookmarked {media_type}!</>);
      }
      dispatch(updateBookmark(movie));
    }
  };
  return (
    <div
      data-test-id="trendingCard"
      key={movie.id}
      className="relative h-full w-full "
    >
      <NavLink to={cardLink} aria-label="trending-card-link">
        <div
          className={`relative overflow-hidden cursor-pointer  bg-opacity-80  rounded-lg  `}
        >
          <div className="z-40 opacity-0 hover:opacity-100 transition-all select-none absolute flex justify-center items-center w-full h-full bg-greyishBlue bg-opacity-30  ">
            <div className="flex justify-center items-center gap-2 opacity-100 bg-greyishBlue py-3 px-4 rounded-full">
              <IoIosInformationCircleOutline size={30} color="#fff" />
              <p className="text-bodyM md:text-headingXs">More Info</p>
            </div>
          </div>

          <div className="h-[230px] ">
            <Image
              src={image}
              className="z-10 object-cover select-none hover:opacity-30 rounded-lg h-full w-full inset-0 bg-gradient-to-b from-transparent to-black"
              alt={title}
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
                {media_type === "tv" ? "TV" : media_type}
              </p>
              <span className="w-1 h-1 rounded-full bg-white"></span>
              <p>{adult}</p>
            </div>
            <p className="mt-1 text-bodyM md:text-headingM font-outfitMedium">
              {title}
            </p>
          </div>
        </div>
      </NavLink>
      {/*  Bookmark */}
      <div
        className="z-50 absolute top-0 right-0 m-2 w-8 h-8 rounded-full p-2 bg-greyishBlue hover:bg-white hover:text-darkBlue cursor-pointer"
        onClick={handleBookmark}
        role="card-bookmark"
      >
        {isBookmarked && sessionId ? (
          <FaBookmark role="bookmark-loggedIn" aria-label="bookmark-loggedIn" />
        ) : (
          <FaRegBookmark
            role="bookmark-notLoggedIn"
            aria-label="bookmark-notLoggedIn"
          />
        )}
      </div>
    </div>
  );
};

export default TrendingCard;
