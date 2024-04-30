import { FC } from "react";

interface ParagraphProps {
  size: string;
  text: string;
}
const Paragraph: FC<ParagraphProps> = ({ size = "md", text }) => {
  let textSize = "[15px]";
  switch (size) {
    case "sm":
      textSize = "[13px]";
      break;
    default:
      textSize = "[15px]";
      break;
  }
  return <p className={`font-outfit text-${textSize}`}>{text}</p>;
};

export default Paragraph;
