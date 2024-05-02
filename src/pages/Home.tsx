import SearchInput from "../components/ui/SearchInput";
import { ChangeEventHandler, useState } from "react";
import CardList from "../components/ui/CardList";
import Loading from "../components/ui/Loading";
import Trending from "../components/home/Trending";
import {
  useGetSearchResultsQuery,
  useGetTrendingQuery,
} from "../state/features/homeApiSlice";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data,
    error: trendingError,
    isLoading: trendingLoading,
  } = useGetTrendingQuery("api");

  const {
    data: searchResult,
    error: searchResultError,
    isLoading: searchResultLoading,
  } = useGetSearchResultsQuery(searchQuery);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchQuery(e.target.value);
  };

  if (searchResultLoading || trendingLoading) return <Loading />;
  if (!data) return <>No Data</>;

  const { trending, recommending } = data;

  return (
    <div className="p-4 md:p-8 md:ml-16 w-full ">
      <SearchInput
        placeholder="Search for movies or TV series"
        handleChange={handleChange}
      />
      {searchQuery ? (
        <CardList
          title={`Found ${searchResult!.length} results for '${searchQuery}'`}
          movieList={searchResult!}
        />
      ) : (
        <>
          <Trending movieList={trending!} />
          <CardList title="Recommended for you" movieList={recommending!} />
        </>
      )}
    </div>
  );
};

export default Home;
