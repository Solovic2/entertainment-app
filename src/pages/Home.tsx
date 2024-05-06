import SearchInput from "../components/shared/SearchInput";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import {
  ChangeEventHandler,
  KeyboardEventHandler,
  useEffect,
  useState,
} from "react";
import { fetchMedia, fetchSearch } from "../state/features/homeSlice";
import CardList from "../components/shared/CardList";
import Loading from "../components/shared/Loading";
import Trending from "../components/home/Trending";
import { useSearchParams } from "react-router-dom";
import Error from "../components/shared/Error";
import ReactPaginate from "react-paginate";

const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const page: number = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    if (searchQuery) {
      dispatch(fetchSearch({ searchQuery, page }));
    }
  }, [dispatch, searchQuery, page]);

  const {
    loading,
    trending,
    recommending,
    searchResults,
    searchLoading,
    trendingError,
    recommendingError,
    searchError,
    currentPage,
    totalPages,
    totalSearchResults,
  } = useSelector((state: RootState) => state.home);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.value && searchQuery) {
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
    }
  };
  // Fetch Searched media based on search param
  // useEffect(() => {
  //   dispatch(fetchSearch(searchParams.get("q")!));
  // }, [dispatch, searchParams]);

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
          title={`Found ${totalSearchResults} results for '${searchParams.get(
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
        value={searchQuery}
      />
      {renderContent()}
      {searchParams.get("q") && (
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
      )}
    </div>
  );
};

export default Home;
