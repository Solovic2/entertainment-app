import SearchInput from "../components/ui/SearchInput";
import CardGroup from "../components/ui/CardGroup";

const Movies = () => {
  return (
    <div className="p-4 md:p-8 md:ml-16 w-full">
      <SearchInput placeholder="Search for movies" />
      <CardGroup title="Movies" />
    </div>
  );
};

export default Movies;
