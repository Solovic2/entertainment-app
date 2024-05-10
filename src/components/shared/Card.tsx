import { FC } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { PiTelevision } from "react-icons/pi";
import { MdLocalMovies } from "react-icons/md";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { MediaCardProp } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import { updateBookmark } from "../../state/auth/authSlice";
import { NavLink } from "react-router-dom";
import Image from "./Image";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface CardProps {
  movie: MediaCardProp;
}
const Card: FC<CardProps> = ({ movie }) => {
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
    <div data-test-id="card" className="relative">
      <NavLink to={cardLink} aria-label="card-link">
        <div className="flex flex-col">
          <div
            className={`relative overflow-hidden cursor-pointer  bg-opacity-80  rounded-lg`}
          >
            <div className="z-10 opacity-0 hover:opacity-100 transition-all select-none absolute flex justify-center items-center w-full h-full bg-greyishBlue bg-opacity-30  ">
              <div className="flex justify-center items-center gap-0 sm:gap-2 opacity-100 bg-greyishBlue py-2 px-2 md:py-3 md:px-4 rounded-full">
                <IoIosInformationCircleOutline
                  color="#fff"
                  className="w-[20px] h-[20px] md:w-[30px] md:h-[30px]"
                />
                <p className="text-bodySm md:text-headingXs">More Info</p>
              </div>
            </div>

            <div className="h-28 sm:h-36 md:h-44">
              <Image
                src={image}
                className=" object-cover select-none hover:opacity-30 rounded-lg h-full w-full"
                alt={title}
              />
            </div>
          </div>

          <div>
            <div className="text-[11px] md:text-bodySm font-outfitLight opacity-75 mt-2 flex items-center  gap-2">
              <span>{date}</span>
              <span className="w-1 h-1 rounded-full bg-white"></span>
              <p className="flex items-center gap-1 capitalize">
                {typeMedia}
                {media_type === "tv" ? "TV" : media_type}
              </p>
              <span className="w-1 h-1 rounded-full bg-white"></span>
              <p>{adult}</p>
            </div>
            <p className="text-[14px] md:text-headingXs font-outfitMedium ">
              {title}
            </p>
          </div>
        </div>
      </NavLink>
      <div
        className="z-30 absolute top-0 right-0 m-2 w-8 h-8 rounded-full p-2 bg-greyishBlue hover:bg-white hover:text-darkBlue cursor-pointer"
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

export default Card;
