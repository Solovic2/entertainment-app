import { FC } from "react";
import Card from "../ui/Card";
import { basic_imageUrl } from "../../constants";
import { moviesProps } from "../../types";

const Trending: FC<moviesProps> = ({ movies }) => {
  return (
    <div className="mt-9">
      <h1 className="text-[20px]">Trending</h1>
      <div className="mt-5 flex  gap-3 overflow-x-scroll scrollbar-hide ">
        {movies.map((movie) => {
          return (
            <Card
              key={movie.id}
              imgURL={basic_imageUrl + movie.backdrop_path}
              title={
                movie?.name ||
                movie?.original_name ||
                movie?.title ||
                movie?.original_title
              }
              isTrending={true}
              description="sadsadsa"
            />
          );
        })}
      </div>
    </div>
  );
};

export default Trending;
