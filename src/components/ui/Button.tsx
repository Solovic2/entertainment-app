import React, { FC, MouseEventHandler } from "react";
interface ButtonProps {
  name: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
const Button: FC<ButtonProps> = ({ name, className, onClick }) => {
  return (
    <button
      className={`mt-4 rounded-md bg-primaryRed hover:bg-white hover:text-semiDarkBlue flex justify-center p-3 w-full 
        ${className}`}
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export default Button;
