import { ReactNode } from "react";
interface LayoutCardProps {
  title: string;
  children: ReactNode;
}
const LayoutCard = ({ title, children }: LayoutCardProps) => {
  return (
    <div className="mt-9 w-[100%]">
      <div className="text-[20px] md:text-headingLg font-outfitLight">
        {title}
      </div>
      {children}
    </div>
  );
};

export default LayoutCard;
