import SearchInput from "../components/ui/SearchInput";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import {
  ChangeEventHandler,
  KeyboardEventHandler,
  useEffect,
  useState,
} from "react";
import CardList from "../components/ui/CardList";
import Loading from "../components/ui/Loading";
import Error from "../components/ui/Error";
import { useSearchParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { fetchSearchTv, fetchTvMedia } from "../state/features/tvSlice";

const TV = () => {
  const dispatch: AppDispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const page: number = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    if (searchQuery) {
      dispatch(fetchSearchTv({ searchQuery, page }));
    } else {
      dispatch(fetchTvMedia(page));
    }
  }, [dispatch, searchQuery, page]);

  const {
    loading,
    movieList,
    searchResults,
    totalSearchResults,
    error,
    currentPage,
    totalPages,
  } = useSelector((state: RootState) => state.tv);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.value) {
      setSearchQuery("");
      setSearchParams({}, { replace: true });
    }
  };
  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.currentTarget;
    if (e.key === "Enter") {
      if (value === "") {
        setSearchParams({}, { replace: true });
        setSearchQuery("");
      } else {
        setSearchParams({ page: "1", q: value }, { replace: true });
        setSearchQuery(value);
      }
    }
  };

  const handlePageChange = (selectedItem: { selected: number }) => {
    const value = selectedItem.selected + 1;
    if (searchQuery) {
      setSearchParams(
        { page: value.toString(), q: searchQuery },
        { replace: true }
      );
    } else {
      console.log(value);

      if (value === 1) setSearchParams({}, { replace: true });
      else setSearchParams({ page: value.toString() }, { replace: true });
    }
  };

  // Render Content
  const renderContent = () => {
    if (loading) return <Loading />;
    if (searchParams.get("q"))
      return (
        <CardList
          title={`Found ${totalSearchResults} tv series results for '${searchParams.get(
            "q"
          )}'`}
          movieList={searchResults}
        />
      );

    return (
      <>
        <CardList title="TV Series" movieList={movieList} />
      </>
    );
  };
  const renderPagination = () => {
    if (searchParams.get("q"))
      return (
        <ReactPaginate
          pageCount={totalPages}
          onPageChange={handlePageChange}
          forcePage={currentPage - 1}
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          className="mt-5 flex items-center justify-center gap-5 text-white"
          pageClassName="bg-semiDarkBlue px-2 rounded-md font-outfitMedium"
          activeClassName=" activeClassName"
          activeLinkClassName="w-full h-full"
        />
      );

    const pageCount = totalPages < 500 ? totalPages : 500;
    return (
      <>
        <ReactPaginate
          pageCount={pageCount}
          onPageChange={handlePageChange}
          forcePage={currentPage - 1}
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
  if (error) return <Error message={error} />;

  return (
    <div className="p-4 md:p-8 md:ml-24 w-full">
      <SearchInput
        placeholder="Search for TV Series"
        handleKeyDown={handleKeyDown}
        value={searchQuery}
        handleChange={handleChange}
      />
      {renderContent()}
      {renderPagination()}
    </div>
  );
};

export default TV;
