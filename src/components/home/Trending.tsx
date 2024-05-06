import { FC } from "react";

import { ApiMovie } from "../../types";
import TrendingCard from "./TrendingCard";
import LayoutCard from "../shared/LayoutCard";

interface TrendingProps {
  movieList: ApiMovie[];
}
const Trending: FC<TrendingProps> = ({ movieList }) => {
  return (
    <LayoutCard title="Trending">
      <div className="relative flex scrollbar-hide overflow-x-scroll w-full ">
        <div className="grid grid-cols-[repeat(5,100%)] md:grid-cols-[repeat(5,70%)] lg:grid-cols-[repeat(5,40%)]  py-5 w-full gap-5 md:gap-8  animate-scrollRight hover:pause">
          {movieList?.map((movie) => {
            return <TrendingCard key={movie.id} movie={movie} />;
          })}
        </div>
      </div>
    </LayoutCard>
  );
};

export default Trending;
