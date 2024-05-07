import { FC } from "react";
import Card from "./Card";
import { ApiMovie } from "../../types";
import LayoutCard from "./LayoutCard";
interface CardListProps {
  title: string;
  movieList: ApiMovie[];
}
const CardList: FC<CardListProps> = ({ title, movieList }) => {
  if (movieList.length === 0)
    return (
      <LayoutCard title={title}>
        <div className="my-5 flex items-center justify-center ">
          No movies to show ...
        </div>
      </LayoutCard>
    );
  return (
    <LayoutCard title={title}>
      <div className="mt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-y-8 md:gap-x-10 w-full">
        {movieList?.map((movie: ApiMovie) => {
          return (
            <div
              key={movie.id}
              className="flex flex-col h-full"
              data-test-id="card-list"
            >
              <Card key={movie.id} movie={movie} />
            </div>
          );
        })}
      </div>
    </LayoutCard>
  );
};

export default CardList;
