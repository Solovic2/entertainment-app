import { FC } from "react";
import Card from "./Card";
interface CardGroupProps {
  title: string;
}
const CardGroup: FC<CardGroupProps> = ({ title }) => {
  return (
    <div className="mt-9 ">
      <h1 className="text-[20px]">{title}</h1>
      <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-5">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};

export default CardGroup;
