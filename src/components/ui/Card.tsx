import { FC, useState } from "react";
import { FaRegBookmark } from "react-icons/fa";
import { FaPlayCircle } from "react-icons/fa";
interface CardProps {
  isTrending?: boolean;
}
const Card: FC<CardProps> = ({ isTrending }) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      className="flex flex-col  w-full"
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* ${
          isTrending ? "w-60 md:w-[470px]" : "w-36  md:w-64 "
        }  */}
      <div
        className={`w-40 h-28 md:h-44 relative bg-opacity-50 cursor-pointer hover:bg-opacity-50 rounded-lg`}
      >
        {hover && (
          <div className="flex justify-center items-center w-full h-full hover:bg-opacity-100">
            <div className="flex justify-center items-center gap-3 md:gap-4 bg-greyishBlue py-3 px-4 rounded-full">
              <FaPlayCircle size={30} color="#fff" />
              <p className="text-bodyM md:text-headingXs">Play</p>
            </div>
          </div>
        )}
        <img src="" alt="" />
        <div className="absolute top-0 right-0 w-8 h-8 rounded-full p-2 bg-greyishBlue hover:bg-white hover:text-darkBlue cursor-pointer">
          <FaRegBookmark />
          {/* <FaBookmark /> */}
        </div>
        {isTrending && (
          <div className={`${isTrending && "absolute bottom-0"}`}>
            <p className="text-[12px] opacity-75">2016 . ICON . PG</p>
            <p className="mt-1 text-[15px]">Lorem ipsum dolor s</p>
          </div>
        )}
      </div>
      {!isTrending && (
        <div>
          <p className="text-[11px] opacity-75">2016 . ICON . PG</p>
          <p className="mt-2 text-[14px]">Lorem ipsum dolor s</p>
        </div>
      )}
    </div>
  );
};

export default Card;
