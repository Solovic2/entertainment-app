import SearchInput from "../components/ui/SearchInput";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import {
  ChangeEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  fetchMovieMedia,
  fetchSearchMedia,
  incrementPage,
} from "../state/features/movieSlice";
import CardList from "../components/ui/CardList";
import Loading from "../components/ui/Loading";
import Error from "../components/ui/Error";
import Button from "../components/ui/Button";
import { useSearchParams } from "react-router-dom";
import ReactPaginate from "react-paginate";

const Movies = () => {
  const dispatch: AppDispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    loading,
    movieList,
    movieListError,
    page,
    searchError,
    searchResults,
    searchLoading,
  } = useSelector((state: RootState) => state.movies);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchQuery(e.target.value);
  };
  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.currentTarget;
    if (e.key === "Enter") {
      setSearchParams({ q: value }, { replace: true });
    }
  };

  const handlePageChange = (selectedItem: { selected: number }) => {
    dispatch(fetchMovieMedia(selectedItem.selected + 1));
  };
  // Fetch movies based on search params
  useEffect(() => {
    if (searchParams.get("q"))
      dispatch(fetchSearchMedia(searchParams.get("q")!));
  }, [dispatch, searchParams]);

  // Fetch Movies
  useEffect(() => {
    dispatch(fetchMovieMedia(1));
  }, [dispatch]);
  console.log("S");

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
        <CardList title="Movie Series" movieList={movieList} />
      </>
    );
  };

  // Display Error when fetch fail
  if (movieListError || searchError)
    return <Error message="Error Fetching Data" />;

  return (
    <div className="p-4 md:p-8 md:ml-24 w-full">
      <SearchInput
        placeholder="Search for movies"
        handleChange={handleChange}
        handleKeyDown={handleKeyDown}
      />
      {renderContent()}
      {page > 0 && (
        <ReactPaginate
          pageCount={500}
          onPageChange={handlePageChange}
          initialPage={0}
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          className="mt-5 flex items-center justify-center gap-5 text-white"
          pageClassName="bg-semiDarkBlue px-2 rounded-md font-outfitMedium"
          activeClassName=" activeClassName"
          activeLinkClassName="w-full h-full"
        />
      )}

      {/* <div className="w-fit flex items-center justify-center  mx-auto ">
          <Button name="Load more" onClick={handleLoadMore} />
        </div> */}
    </div>
  );
};

export default Movies;
