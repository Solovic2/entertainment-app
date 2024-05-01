import { FC } from "react";
import Card from "./Card";
import { ApiMovie } from "../../types";
interface CardListProps {
  title: string;
  movieList: ApiMovie[];
}
const CardList: FC<CardListProps> = ({ title, movieList }) => {
  return (
    <div className="mt-9 w-[100%]">
      <div className="text-[20px]">{title}</div>
      <div className="mt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full">
        {movieList?.map((movie: ApiMovie) => {
          return <Card key={movie.id} movie={movie} />;
        })}
      </div>
    </div>
  );
};

export default CardList;
