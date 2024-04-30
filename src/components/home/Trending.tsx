import React from "react";
import Heading from "../ui/Heading";
import Card from "../ui/Card";

const Trending = () => {
  return (
    <div className="mt-9 w-fit">
      <h1 className="text-[20px]">Trending</h1>
      <div className="mt-5 flex  gap-3 overflow-x-scroll scrollbar-hide ">
        <Card isTrending={true} />
        <Card isTrending={true} />
        <Card isTrending={true} />
        <Card isTrending={true} />
        <Card isTrending={true} />
      </div>
    </div>
  );
};

export default Trending;
