import React, { FC } from "react";
interface ButtonProps {
  name: string;
}
const Button: FC<ButtonProps> = ({ name }) => {
  return (
    <button className="mt-4 rounded-md bg-primaryRed hover:bg-white hover:text-semiDarkBlue flex justify-center p-3 w-full">
      {name}
    </button>
  );
};

export default Button;
