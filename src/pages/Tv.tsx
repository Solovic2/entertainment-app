import SearchInput from "../components/ui/SearchInput";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { ChangeEventHandler, useEffect, useState } from "react";
import { fetchTvMedia } from "../state/features/tvSlice";
import CardList from "../components/ui/CardList";
import Loading from "../components/ui/Loading";
import Error from "../components/ui/Error";
const TV = () => {
  const dispatch: AppDispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const { loading, movieList, movieListError } = useSelector(
    (state: RootState) => state.tv
  );

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    dispatch(fetchTvMedia(searchQuery));
  }, [searchQuery]);

  // Check If loading or Error
  if (loading) return <Loading />;
  if (movieListError) return <Error message={movieListError} />;

  return (
    <div className="p-4 md:p-8 md:ml-24 w-full">
      <SearchInput
        placeholder="Search for TV Series"
        handleChange={handleChange}
      />
      <CardList title="TV Series" movieList={movieList} />
    </div>
  );
};

export default TV;
