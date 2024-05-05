import SearchInput from "../components/ui/SearchInput";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { ChangeEventHandler, useEffect, useState } from "react";
import CardList from "../components/ui/CardList";
import { ApiMovie } from "../types";

const Bookmark = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ApiMovie[]>([]);
  const { sessionId, bookmarks } = useSelector(
    (state: RootState) => state.auth
  );

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchQuery(e.target.value);
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
  }, [searchQuery, bookmarks]);

  const bookmarksMovies = bookmarks.filter(
    (element) => (element.movie_type || element.media_type) === "movie"
  );
  const bookmarksTv = bookmarks.filter(
    (element) => (element.movie_type || element.media_type) !== "movie"
  );

  return (
    <div className="p-4 md:p-8 md:ml-24 w-full">
      <SearchInput
        placeholder="Search for bookmarked shows"
        handleChange={handleChange}
      />
      {searchQuery ? (
        <>
          <CardList
            title={`Found ${searchResults.length} results for '${searchQuery}'`}
            movieList={searchResults}
          />
        </>
      ) : bookmarks ? (
        <>
          {bookmarksMovies.length > 0 && (
            <CardList title="Movie Bookmarks" movieList={bookmarksMovies} />
          )}
          {bookmarksTv.length > 0 && (
            <CardList title="TV Series Bookmarks" movieList={bookmarksTv} />
          )}
        </>
      ) : (
        <>No Bookmarks</>
      )}
      {}
    </div>
  );
};

export default Bookmark;
