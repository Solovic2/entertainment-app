import React, { FC, ReactNode } from "react";

interface HeadingProps {
  size: string;
  text: string;
}
const Heading: FC<HeadingProps> = ({ size = "lg", text }) => {
  let textSize = "32px";
  switch (size) {
    case "md":
      textSize = "24px";
      break;
    case "xs":
      textSize = "18px";
      break;
    default:
      textSize = "32px";
      break;
  }
  return <h1 className={`w-fit font-outfit text-[${textSize}]`}>{text}</h1>;
};

export default Heading;
