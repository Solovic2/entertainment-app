import { FC } from "react";
import { CiSearch } from "react-icons/ci";
interface SearchProps {
  placeholder: string;
}
const SearchInput: FC<SearchProps> = ({ placeholder }) => {
  return (
    <div className="flex items-center gap-3 mt-1 w-full ">
      <CiSearch className="w-6 h-6 md:w-8 md:h-8" />
      <input
        className="py-2 outline-none border-transparent focus:border w-full h-full focus:border-b-greyishBlue bg-transparent caret-primaryRed "
        type="text"
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchInput;
