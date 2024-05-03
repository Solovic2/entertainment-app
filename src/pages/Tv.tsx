import SearchInput from "../components/ui/SearchInput";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import {
  ChangeEventHandler,
  KeyboardEventHandler,
  useEffect,
  useState,
} from "react";
import { fetchSearchTV, fetchTvMedia } from "../state/features/tvSlice";
import CardList from "../components/ui/CardList";
import Loading from "../components/ui/Loading";
import Error from "../components/ui/Error";
import { useSearchParams } from "react-router-dom";

const TV = () => {
  const dispatch: AppDispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    loading,
    movieList,
    movieListError,
    searchResults,
    searchError,
    searchLoading,
  } = useSelector((state: RootState) => state.tv);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.currentTarget;
    if (e.key === "Enter") {
      setSearchParams({ q: value }, { replace: true });
    }
  };

  // Fetch movies based on search params
  useEffect(() => {
    dispatch(fetchSearchTV(searchParams.get("q")!));
  }, [dispatch, searchParams]);

  // Fetch TV Series
  useEffect(() => {
    dispatch(fetchTvMedia());
  }, [dispatch]);

  // Render Content
  const renderContent = () => {
    if (loading || searchLoading) return <Loading />;
    if (searchParams.get("q"))
      return (
        <CardList
          title={`Found ${
            searchResults.length
          } movie results for '${searchParams.get("q")}'`}
          movieList={searchResults}
        />
      );

    return (
      <>
        <CardList title="TV Series" movieList={movieList} />
      </>
    );
  };

  // Display Error when fetch fail
  if (movieListError || searchError)
    return <Error message="Error Fetching Data" />;

  return (
    <div className="p-4 md:p-8 md:ml-24 w-full">
      <SearchInput
        placeholder="Search for TV Series"
        handleChange={handleChange}
        handleKeyDown={handleKeyDown}
      />
      {renderContent()}
    </div>
  );
};

export default TV;
