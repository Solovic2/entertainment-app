import SearchInput from "../components/ui/SearchInput";

import { ChangeEventHandler, useEffect, useState } from "react";
import CardList from "../components/ui/CardList";
import Loading from "../components/ui/Loading";
import { toast } from "react-toastify";
import { useGetMoviesQuery } from "../state/features/movieApiSlice";

const Movies = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: movieList, error, isLoading } = useGetMoviesQuery(searchQuery);
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchQuery(e.target.value);
  };

  // useEffect(() => {
  //   if (error) toast.error(error);
  // }, [error]);

  if (isLoading) return <Loading />;
  if (error) return <>{error}</>;
  return (
    <div className="p-4 md:p-8 md:ml-16 w-full">
      <SearchInput
        placeholder="Search for movies"
        handleChange={handleChange}
      />

      <CardList title="Movie" movieList={movieList!} />
    </div>
  );
};

export default Movies;
