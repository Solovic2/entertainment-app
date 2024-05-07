import { useState } from "react";
import { MdError } from "react-icons/md";

interface ErrorProps {
  message: string;
}
const Error = ({ message }: ErrorProps) => {
  const [close, setClose] = useState(false);
  return (
    <div
      data-test-id="error"
      className={`absolute top-20  right-10 h-12 p-5 flex  items-center gap-5  bg-white text-red-600 rounded-lg cursor-pointer ${
        close ? "hidden" : ""
      }`}
      onClick={() => setClose(true)}
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
