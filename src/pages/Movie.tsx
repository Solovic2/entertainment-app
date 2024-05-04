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
  const {
    loading,
    movieList,
    movieListError,
    searchError,
    searchResults,
    searchLoading,
  } = useSelector((state: RootState) => state.movies);
  const [searchParams, setSearchParams] = useSearchParams({ page: "1" });
  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.currentTarget;
    if (e.key === "Enter") {
      if (value === "") setSearchParams({}, { replace: true });
      else setSearchParams({ page: "1", q: value }, { replace: true });
    }
  };

  const handlePageChange = (selectedItem: { selected: number }) => {
    const value = selectedItem.selected + 1;
    searchParams.set("page", value + "");
    setSearchParams(searchParams, { replace: true });
  };

  // Fetch movies based on search params
  useEffect(() => {
    if (searchParams.get("q") && searchParams.get("page")) {
      const data: { search: string; page: number } = {
        search: searchParams.get("q")!,
        page: parseInt(searchParams.get("page")!),
      };
      dispatch(fetchSearchMedia(data));
    } else {
      if (searchParams.get("page")) {
        const page: number = parseInt(searchParams.get("page")!);
        dispatch(fetchMovieMedia(page));
      }
    }
  }, [dispatch, searchParams]);

  // Render Content
  const renderContent = () => {
    if (loading || searchLoading) return <Loading />;
    if (searchParams.get("q"))
      return (
        <CardList
          title={`Found ${
            searchResults.results.length
          } movie results for '${searchParams.get("q")}'`}
          movieList={searchResults.results}
        />
      );

    return (
      <>
        <CardList title="Movie Series" movieList={movieList.results} />
      </>
    );
  };
  const renderPagination = () => {
    if (searchParams.get("q"))
      return (
        <ReactPaginate
          pageCount={searchResults.total_pages}
          onPageChange={handlePageChange}
          forcePage={searchResults.page - 1}
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          className="mt-5 flex items-center justify-center gap-5 text-white"
          pageClassName="bg-semiDarkBlue px-2 rounded-md font-outfitMedium"
          activeClassName=" activeClassName"
          activeLinkClassName="w-full h-full"
        />
      );

    const pageCount = movieList.total_pages < 500 ? movieList.total_pages : 500;
    return (
      <>
        <ReactPaginate
          pageCount={pageCount}
          onPageChange={handlePageChange}
          forcePage={movieList.page - 1}
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          className="mt-5 flex items-center justify-center gap-5 text-white"
          pageClassName="bg-semiDarkBlue px-2 rounded-md font-outfitMedium"
          activeClassName=" activeClassName"
          activeLinkClassName="w-full h-full"
        />
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
        handleKeyDown={handleKeyDown}
      />
      {renderContent()}
      {renderPagination()}
      {/* {page > 0 && (
        <>
          {searchParams.get("q") ? (
            <>
              <ReactPaginate
                pageCount={searchResults.total_pages}
                onPageChange={handlePageChange}
                forcePage={parseInt(searchParams.get("page")!) - 1}
                previousLabel={"<"}
                nextLabel={">"}
                breakLabel={"..."}
                className="mt-5 flex items-center justify-center gap-5 text-white"
                pageClassName="bg-semiDarkBlue px-2 rounded-md font-outfitMedium"
                activeClassName=" activeClassName"
                activeLinkClassName="w-full h-full"
              />
            </>
          ) : (
            <>
              <ReactPaginate
                pageCount={movieList.total_pages}
                onPageChange={handlePageChange}
                forcePage={parseInt(searchParams.get("page")!) - 1}
                previousLabel={"<"}
                nextLabel={">"}
                breakLabel={"..."}
                className="mt-5 flex items-center justify-center gap-5 text-white"
                pageClassName="bg-semiDarkBlue px-2 rounded-md font-outfitMedium"
                activeClassName=" activeClassName"
                activeLinkClassName="w-full h-full"
              />
            </>
          )}
        </>
      )} */}

      {/* <div className="w-fit flex items-center justify-center  mx-auto ">
          <Button name="Load more" onClick={handleLoadMore} />
        </div> */}
    </div>
  );
};

export default Movies;
