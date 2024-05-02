import SearchInput from "../components/ui/SearchInput";
import { ChangeEventHandler, useEffect, useState } from "react";
import CardList from "../components/ui/CardList";
import Loading from "../components/ui/Loading";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetTvSeriesQuery } from "../state/features/tvApiSlice";
const TV = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: movieList,
    error,
    isLoading,
  } = useGetTvSeriesQuery(searchQuery);
  console.log(movieList);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchQuery(e.target.value);
  };

  // useEffect(() => {
  //   if (error) toast.error(error);
  // }, [error]);

  if (isLoading) return <Loading />;
  if (error) return <></>;
  return (
    <div className="p-4 md:p-8 md:ml-16 w-full">
      <SearchInput
        placeholder="Search for TV Series"
        handleChange={handleChange}
      />
      <CardList title="TV Series" movieList={movieList!} />
    </div>
  );
};

export default TV;
