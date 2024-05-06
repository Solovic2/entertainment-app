import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-[calc(100svh-10rem)] w-full">
      <AiOutlineLoading3Quarters className="animate-spin" />
    </div>
  );
};

export default Loading;
