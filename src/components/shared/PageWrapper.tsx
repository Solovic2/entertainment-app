import { ReactNode, useEffect } from "react";
import SearchInput from "./SearchInput";
import { useLocation, useSearchParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../state/store";
import { useDispatch, useSelector } from "react-redux";
import CardList from "./CardList";
import { fetchSearch } from "../../state/features/searchSlice";
import Loading from "./Loading";
import Pagination from "./Pagination";

interface PageWrapperProps {
  children: ReactNode;
}

const PageWrapper = ({ children }: PageWrapperProps) => {
  const dispatch: AppDispatch = useDispatch();
  const {
    loading,
    searchResults,
    totalSearchResults,
    error,
    currentPage,
    totalPages,
  } = useSelector((state: RootState) => state.search);

  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const pathname: string = location.pathname.slice(1);
  const type =
    pathname === "" ? "multi" : pathname === "movies" ? "movie" : "tv";
  const page: number = Number(searchParams.get("page")) || 1;
  const searchQuery: string = searchParams.get("q") || "";

  const handleSearchParamsChange = (
    params: Record<string, string | string[]>
  ) => {
    setSearchParams(params, { replace: true });
  };

  const handlePageChange = (selectedItem: { selected: number }) => {
    const value = selectedItem.selected + 1;
    if (searchQuery) {
      setSearchParams(
        { page: value.toString(), q: searchQuery },
        { replace: true }
      );
    }
  };

  useEffect(() => {
    if (searchQuery) {
      dispatch(fetchSearch({ searchQuery, page, type: type }));
    }
  }, [dispatch, searchQuery, page, type]);

  if (error) throw new Error(error);

  return (
    <div className="p-4 md:p-8 md:ml-24 w-full">
      <SearchInput
        placeholder="Search for movies"
        value={searchQuery}
        setSearchParams={handleSearchParamsChange}
      />
      {loading ? (
        <Loading />
      ) : (
        <>
          {searchQuery ? (
            <>
              {" "}
              <CardList
                title={`Found ${totalSearchResults} movie results for '${searchQuery}'`}
                movieList={searchResults}
              />
              {totalSearchResults > 0 && (
                <Pagination
                  totalPages={totalPages}
                  handlePageChange={handlePageChange}
                  currentPage={currentPage}
                  dataTestId="search-pagination"
                />
              )}
            </>
          ) : (
            <>{children}</>
          )}
        </>
      )}
    </div>
  );
};

export default PageWrapper;
