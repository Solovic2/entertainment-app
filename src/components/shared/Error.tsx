import { useState } from "react";
import { MdError } from "react-icons/md";
import { useNavigate } from "react-router-dom";

interface ErrorProps {
  message: string;
}
const Error = ({ message }: ErrorProps) => {
  const [close, setClose] = useState(false);
  const navigate = useNavigate();
  const handleOnClick = () => {
    setClose(true);
    navigate(0);
  };
  return (
    <div
      data-test-id="error"
      className={`w-full md:w-fit flex justify-center  items-center h-12 p-5 gap-5 bg-white text-red-600 md:absolute md:top-20 md:right-10 md:rounded-lg cursor-pointer ${
        close ? "hidden" : ""
      }`}
      onClick={handleOnClick}
      role="div-error"
    >
      <p>
        <MdError size={25} />
      </p>
      <p className="text-xl">{message}</p>
    </div>
  );
};

export default Error;
