import SearchInput from "../components/ui/SearchInput";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { ChangeEventHandler, useEffect, useState } from "react";
import { fetchMovieMedia } from "../state/features/movieSlice";
import CardList from "../components/ui/CardList";
import Loading from "../components/ui/Loading";
import { toast } from "react-toastify";

const Movies = () => {
  const dispatch: AppDispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const { loading, movieList, movieListError } = useSelector(
    (state: RootState) => state.movies
  );

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    dispatch(fetchMovieMedia(searchQuery));
  }, [searchQuery]);

  useEffect(() => {
    if (movieListError) toast.error(movieListError);
  }, [movieListError]);

  if (loading) return <Loading />;
  if (movieListError) return <></>;
  return (
    <div className="p-4 md:p-8 md:ml-24 w-full">
      <SearchInput
        placeholder="Search for movies"
        handleChange={handleChange}
      />

      <CardList title="Movie" movieList={movieList} />
    </div>
  );
};

export default Movies;
