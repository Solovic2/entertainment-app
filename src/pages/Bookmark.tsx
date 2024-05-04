import SearchInput from "../components/ui/SearchInput";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { ChangeEventHandler, useEffect, useState } from "react";
import CardList from "../components/ui/CardList";
import { ApiMovie } from "../types";
import {
  fetchFavoriteMovies,
  fetchFavoriteTV,
} from "../state/auth/bookmarkSlice";

const Bookmark = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ApiMovie[]>([]);
  const { sessionId } = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();
  const {
    bookmarksMovies,
    bookmarksTV,
    errorMovies,
    errorTV,
    loadingMovies,
    loadingTV,
  } = useSelector((state: RootState) => state.bookmark);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchQuery(e.target.value);
  };
  useEffect(() => {
    dispatch(fetchFavoriteMovies(sessionId));
    dispatch(fetchFavoriteTV(sessionId));
  }, [dispatch]);

  // Render Content
  const renderContent = (
    loading: boolean,
    error: boolean,
    bookmarksMovies: ApiMovie[],
    type: string
  ) => {
    if (loading) <>...Loading Bookmarked Movies</>;
    if (error) <>...Loading Bookmarked Movies</>;
    bookmarksMovies.length > 0 && (
      <CardList title={`${type} Bookmarks`} movieList={bookmarksMovies} />
    );
  };
  return (
    <div className="p-4 md:p-8 md:ml-24 w-full">
      <SearchInput
        placeholder="Search for bookmarked shows"
        handleChange={handleChange}
      />
      <>
        {renderContent(loadingMovies, errorMovies, bookmarksMovies, "Movie")}
        {renderContent(loadingTV, errorTV, bookmarksTV, "TV Series")}
      </>
    </div>
  );
};

export default Bookmark;
