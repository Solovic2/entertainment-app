import { FC, MouseEventHandler } from "react";
interface ButtonProps {
  name: string;
  className?: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
const Button: FC<ButtonProps> = ({ name, className, onClick, disabled }) => {
  return (
    <button
      data-test-id="button"
      className={`mt-4 rounded-md    flex justify-center p-3 w-full 
        ${
          disabled
            ? "bg-darkBlue"
            : "bg-primaryRed hover:bg-white hover:text-semiDarkBlue"
        } 
        ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {name}
    </button>
  );
};

export default Button;
