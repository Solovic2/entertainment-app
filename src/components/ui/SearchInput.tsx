import { ChangeEventHandler, FC, KeyboardEventHandler } from "react";
import { CiSearch } from "react-icons/ci";
interface SearchProps {
  placeholder: string;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  handleKeyDown?: KeyboardEventHandler<HTMLInputElement>;
}
const SearchInput: FC<SearchProps> = ({
  placeholder,
  handleChange,
  handleKeyDown,
}) => {
  return (
    <div className="flex items-center gap-3 mt-1 w-full ">
      <CiSearch className="w-6 h-6 md:w-8 md:h-8" />
      <input
        className="py-2 outline-none border-transparent focus:border w-full h-full focus:border-b-greyishBlue bg-transparent caret-primaryRed "
        type="text"
        name="search"
        placeholder={placeholder}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default SearchInput;
