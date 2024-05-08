import SearchInput from "../components/shared/SearchInput";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { ChangeEventHandler, useEffect, useState } from "react";
import CardList from "../components/shared/CardList";
import { ApiMovie } from "../types";
import ReactPaginate from "react-paginate";
import { useSearchParams } from "react-router-dom";

const Bookmark = () => {
  const [searchResults, setSearchResults] = useState<ApiMovie[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1
  );
  const [perPage] = useState(20);

  const { bookmarks } = useSelector((state: RootState) => state.auth);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.value && searchQuery) {
      setSearchQuery("");
      setSearchParams({}, { replace: true });
    } else {
      setSearchQuery(e.target.value);
      setCurrentPage(1);
      setSearchParams({ page: "1", q: e.target.value });
    }
  };

  const handlePageChange = (selectedItem: { selected: number }) => {
    const value = selectedItem.selected + 1;
    setCurrentPage(value);
    if (value === 1) setSearchParams({}, { replace: true });
    else setSearchParams({ page: value.toString(), q: searchQuery });
  };

  useEffect(() => {
    const filterSearch = () => {
      let searchedBookmark = bookmarks.filter((element) => {
        const name = element.name || element.title;
        return name?.toLowerCase().includes(searchQuery.toLowerCase());
      });
      setSearchResults(searchedBookmark);
    };
    filterSearch();
  }, [searchQuery, bookmarks, currentPage]);

  const bookmarksMovies = bookmarks.filter(
    (element) => (element.movie_type || element.media_type) === "movie"
  );
  const bookmarksTv = bookmarks.filter(
    (element) => (element.movie_type || element.media_type) !== "movie"
  );

  const offset = (currentPage - 1) * perPage;
  const totalPages = Math.ceil(searchResults.length / perPage);
  const paginatedResults = searchResults.slice(offset, offset + perPage);

  return (
    <div className="p-4 md:p-8 md:ml-24 w-full">
      <SearchInput
        value={searchQuery}
        placeholder="Search for bookmarked shows"
        handleChange={handleChange}
      />
      {searchQuery ? (
        <>
          <CardList
            title={`Found ${searchResults.length} results for '${searchQuery}'`}
            movieList={paginatedResults}
          />
          <ReactPaginate
            nextAriaLabel="next-page"
            previousAriaLabel="previous-page"
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
        </>
      ) : bookmarks.length > 0 ? (
        <>
          {bookmarksMovies.length > 0 && (
            <CardList title="Movie Bookmarks" movieList={bookmarksMovies} />
          )}
          {bookmarksTv.length > 0 && (
            <CardList title="TV Series Bookmarks" movieList={bookmarksTv} />
          )}
        </>
      ) : (
        <div className="mt-5">No Bookmarks Yet.</div>
      )}
    </div>
  );
};

export default Bookmark;
