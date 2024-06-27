import { useState } from "react";

interface ExpandedProps {
  text: string;
}
const Expanded = ({ text }: ExpandedProps) => {
  const [expanded, setExpanded] = useState(true);
  if (text.length <= 170) return text;
  const expandedText = expanded ? text.substring(0, 170) : text;
  return (
    <>
      <p
        className={`${
          expanded ? "h-20" : "h-40"
        } max-w-[300px] md:max-w-[450px] md:leading-[1.3] text-sm w-[45rem] break-words font-outfitLight overflow-clip`}
      >
        {expanded ? expandedText + "..." : expandedText}

        <button
          className="text-primaryRed font-bold"
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded ? "Show More" : "Show Less"}
        </button>
      </p>
    </>
  );
};

export default Expanded;
