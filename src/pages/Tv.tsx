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
import ReactPaginate from "react-paginate";

const TV = () => {
  const dispatch: AppDispatch = useDispatch();
  const {
    loading,
    movieList,
    movieListError,
    searchResults,
    searchError,
    searchLoading,
  } = useSelector((state: RootState) => state.tv);
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

  useEffect(() => {
    if (searchParams.get("q") && searchParams.get("page")) {
      const data: { search: string; page: number } = {
        search: searchParams.get("q")!,
        page: parseInt(searchParams.get("page")!),
      };
      dispatch(fetchSearchTV(data));
    } else {
      if (searchParams.get("page")) {
        const page: number = parseInt(searchParams.get("page")!);
        dispatch(fetchTvMedia(page));
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
        <CardList title="TV Series" movieList={movieList.results} />
      </>
    );
  };
  // Render Pagination
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
        placeholder="Search for TV Series"
        handleKeyDown={handleKeyDown}
      />
      {renderContent()}
      {renderPagination()}
      {/* {page > 0 && (
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
        />
      )} */}
    </div>
  );
};

export default TV;
