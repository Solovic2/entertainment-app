import SearchInput from "../components/ui/SearchInput";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { ChangeEventHandler, useEffect, useState } from "react";
import { fetchMedia, fetchSearch } from "../state/features/homeSlice";
import CardList from "../components/ui/CardList";
import Loading from "../components/ui/Loading";

const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const {
    loading,
    trending,
    recommending,
    searchResults,
    trendingError,
    recommendingError,
    searchError,
  } = useSelector((state: RootState) => state.home);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    dispatch(fetchMedia());
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    dispatch(fetchSearch(searchQuery));
  }, [searchQuery]);

  return (
    <div className="p-4 md:p-8 md:ml-16 w-full ">
      <SearchInput
        placeholder="Search for movies or TV series"
        handleChange={handleChange}
      />
      {searchQuery ? (
        <CardList
          title={`Found ${searchResults.length} results for '${searchQuery}'`}
          movieList={searchResults}
        />
      ) : loading ? (
        <Loading />
      ) : (
        //Trinding
        <CardList title="Recommended for you" movieList={recommending} />
      )}
    </div>
  );
};

export default Home;
