import { ChangeEventHandler, FC, KeyboardEventHandler } from "react";
import { CiSearch } from "react-icons/ci";
interface SearchProps {
  placeholder: string;
  handleChange?: ChangeEventHandler<HTMLInputElement>;
  handleKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  setSearchParams: (params: Record<string, string | string[]>) => void;
  value?: string;
}
const SearchInput: FC<SearchProps> = ({
  placeholder,
  value,
  setSearchParams,
}) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.value && value) {
      setSearchParams({});
    }
  };
  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.currentTarget;
    if (e.key === "Enter") {
      if (value === "") {
        setSearchParams({});
      } else {
        setSearchParams({ page: "1", q: value });
      }
    }
  };
  return (
    <div className="flex items-center gap-3 mt-1 w-full ">
      <CiSearch className="w-6 h-6 md:w-8 md:h-8" />
      <input
        className="text-headingM font-outfitLight py-2 outline-none border-transparent focus:border w-full h-full focus:border-b-greyishBlue bg-transparent caret-primaryRed "
        type="search"
        name="search"
        data-test-id="search-input"
        defaultValue={value}
        autoComplete="off"
        placeholder={placeholder}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default SearchInput;
