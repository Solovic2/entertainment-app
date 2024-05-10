import { MouseEventHandler } from "react";

interface UserCardProps {
  text: string;
  handleLogout?: MouseEventHandler<HTMLDivElement>;
}

const UserCard = ({ text, handleLogout }: UserCardProps) => {
  return (
    <div
      onClick={text === "Logout" ? handleLogout : undefined}
      role={text === "Logout" ? "logout-click" : undefined}
      className="absolute right-0 md:left-0 md:bottom-20 md:mb-3 bg-white text-black font-outfitMedium rounded-bl-sm md:rounded-md w-20 h-10 mx-auto text-center py-2 px-3 cursor-pointer md:after:content-[''] md:after:border-[10px] md:after:mt-5 md:after:absolute md:after:top-[50%] md:after:left-[30px] md:after:border-transparent md:after:border-t-white md:after:text-white"
    >
      <p className="hover:text-primaryRed">{text}</p>
    </div>
  );
};

export default UserCard;
