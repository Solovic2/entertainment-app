import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { ChangeEventHandler, useEffect, useState } from "react";
import CardList from "../components/shared/CardList";
import { useSearchParams } from "react-router-dom";
import { Media } from "../types";
import { CiSearch } from "react-icons/ci";
import Pagination from "../components/shared/Pagination";

const Bookmark = () => {
  const [searchResults, setSearchResults] = useState<Media[]>([]);
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
      const searchedBookmark: Media[] = bookmarks.filter((element: Media) => {
        const name = element.name || element.title;
        return name?.toLowerCase().includes(searchQuery.toLowerCase());
      });
      setSearchResults(searchedBookmark);
    };
    filterSearch();
  }, [searchQuery, bookmarks, currentPage]);

  const bookmarksMovies = bookmarks.filter(
    (element) => element.media_type === "movie"
  );
  const bookmarksTv = bookmarks.filter(
    (element) => element.media_type !== "movie"
  );

  const offset = (currentPage - 1) * perPage;
  const totalPages = Math.ceil(searchResults.length / perPage);
  const paginatedResults = searchResults.slice(offset, offset + perPage);

  return (
    <div className="p-4 md:p-8 md:ml-24 w-full">
      <div className="flex items-center gap-3 mt-1 w-full ">
        <CiSearch className="w-6 h-6 md:w-8 md:h-8" />
        <input
          className="text-headingM font-outfitLight py-2 outline-none border-transparent focus:border w-full h-full focus:border-b-greyishBlue bg-transparent caret-primaryRed "
          type="search"
          name="search"
          data-test-id="search-input"
          defaultValue={searchQuery}
          autoComplete="off"
          placeholder="Search for bookmarked shows"
          onChange={handleChange}
        />
      </div>

      {searchQuery ? (
        <>
          <CardList
            title={`Found ${searchResults.length} results for '${searchQuery}'`}
            movieList={paginatedResults}
          />
          {searchResults.length > 0 && (
            <Pagination
              dataTestId="bookmark-paginate-search"
              currentPage={currentPage}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
            />
          )}
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
