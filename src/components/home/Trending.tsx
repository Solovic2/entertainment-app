import { FC } from "react";

import { ApiMovie } from "../../types";
import TrendingCard from "./TrendingCard";

interface TrendingProps {
  movieList: ApiMovie[];
}
const Trending: FC<TrendingProps> = ({ movieList }) => {
  return (
    <div className="mt-9 w-[100%] ">
      <div className="text-[20px]">Trending</div>
      <div className="relative flex scrollbar-hide overflow-x-scroll w-full ">
        <div className="grid grid-cols-[repeat(5,100%)] md:grid-cols-[repeat(5,70%)] lg:grid-cols-[repeat(5,40%)]  py-5 w-full  gap-2  animate-scrollRight">
          {movieList?.map((movie) => {
            return <TrendingCard key={movie.id} movie={movie} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Trending;
