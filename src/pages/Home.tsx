import SearchInput from "../components/ui/SearchInput";
import Trending from "../components/home/Trending";
import CardGroup from "../components/ui/CardGroup";

const Home = () => {
  return (
    <div className="p-4 md:p-8 md:ml-16 w-full ">
      <SearchInput placeholder="Search for movies or TV series" />
      <Trending />
      <CardGroup title="Recommended for you" />
    </div>
  );
};

export default Home;
