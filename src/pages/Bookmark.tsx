import SearchInput from "../components/ui/SearchInput";
import CardGroup from "../components/ui/CardGroup";

const Bookmark = () => {
  return (
    <div className="p-4 md:p-8 md:ml-16 w-full">
      <SearchInput placeholder="Search for Bookmarked shows" />
      <CardGroup title="Bookmarked Movies" />
      <CardGroup title="Bookmarked TV Series" />
    </div>
  );
};

export default Bookmark;
