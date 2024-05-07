import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loading = () => {
  return (
    <div
      data-test-id="loading"
      className="flex justify-center items-center h-[calc(100svh-10rem)] w-full"
    >
      <AiOutlineLoading3Quarters
        className="animate-spin"
        role="loading-spinner"
      />
    </div>
  );
};

export default Loading;
