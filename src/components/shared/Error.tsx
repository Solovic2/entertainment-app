import { MdError } from "react-icons/md";

interface ErrorProps {
  message: string;
}
const Error = ({ message }: ErrorProps) => {
  return (
    <div
      data-test-id="error"
      className="w-full h-[calc(100svh-10rem)] flex justify-center items-center flex-col  gap-5 text-red-600 "
      role="div-error"
    >
      <p>
        <MdError size={100} />
      </p>
      <p className="text-3xl md:text-5xl">{message}</p>
    </div>
  );
};

export default Error;
