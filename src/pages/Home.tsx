import SearchInput from "../components/ui/SearchInput";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import {
  ChangeEventHandler,
  KeyboardEventHandler,
  useEffect,
  useState,
} from "react";
import { fetchMedia, fetchSearch } from "../state/features/homeSlice";
import CardList from "../components/ui/CardList";
import Loading from "../components/ui/Loading";
import Trending from "../components/home/Trending";
import { useSearchParams } from "react-router-dom";
import Error from "../components/ui/Error";

const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    loading,
    trending,
    recommending,
    searchResults,
    searchLoading,
    trendingError,
    recommendingError,
    searchError,
  } = useSelector((state: RootState) => state.home);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchQuery(e.target.value);
  };
  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.currentTarget;
    if (e.key === "Enter") {
      setSearchParams({ q: value }, { replace: true });
    }
  };
  // Fetch Searched media based on search param
  useEffect(() => {
    dispatch(fetchSearch(searchParams.get("q")!));
  }, [dispatch, searchParams]);

  // Fetch all Media
  useEffect(() => {
    dispatch(fetchMedia());
  }, [dispatch]);

  // Render Content
  const renderContent = () => {
    if (loading || searchLoading) return <Loading />;
    if (searchParams.get("q"))
      return (
        <CardList
          title={`Found ${searchResults.length} results for '${searchParams.get(
            "q"
          )}'`}
          movieList={searchResults}
        />
      );

    return (
      <>
        <Trending movieList={trending} />
        <CardList title="Recommended for you" movieList={recommending} />
      </>
    );
  };

  // Display Error when fetch fail
  if (searchError || recommendingError || trendingError)
    return <Error message="Error Fetching Data" />;

  return (
    <div className="p-4 md:p-8 md:ml-24 w-full ">
      <SearchInput
        placeholder="Search for movies or TV series"
        handleChange={handleChange}
        handleKeyDown={handleKeyDown}
      />
      {renderContent()}
    </div>
  );
};

export default Home;
