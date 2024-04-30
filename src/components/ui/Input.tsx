import { FC, FormEvent, useState } from "react";
interface InputProps {
  placeholder: string;
  name: string;
  type: string;
}
interface errorMsgs {
  required: boolean;
  email: string;
}
const Input: FC<InputProps> = ({ name, type, placeholder }) => {
  const [errMsg, setErrMsg] = useState({
    required: false,
    email: "",
  });
  const handleInvalidInputs = (e: FormEvent<HTMLInputElement>) => {
    let errors: errorMsgs = {
      required: false,
      email: "",
    };
    errors.required = true;
    (e.target as HTMLInputElement).setCustomValidity(" ");
    if (type === "email" && (e.target as HTMLInputElement).value) {
      errors.email = "Add Valid Email";
    }
    setErrMsg((prev) => ({
      ...prev,
      ...errors,
    }));
  };
  const handleOnInputs = (e: FormEvent<HTMLInputElement>) => {
    (e.target as HTMLInputElement).setCustomValidity("");
    setErrMsg({
      required: false,
      email: "",
    });
  };
  return (
    <>
      <div className="relative">
        <input
          className={`w-full outline-none border-transparent  py-[0.35rem] px-2 text-bodyMd bg-transparent caret-primaryRed 
          ${
            errMsg.required
              ? "border border-b-primaryRed"
              : "border border-b-greyishBlue"
          } `}
          type={type}
          placeholder={placeholder}
          required
          name={name}
          onInput={handleOnInputs}
          onInvalid={handleInvalidInputs}
        />
        {errMsg.required && (
          <span className="absolute top-0 right-0 py-[0.35rem] text-primaryRed text-bodySm ">
            {errMsg.email ? errMsg.email : "Can't be empty"}
          </span>
        )}
      </div>
    </>
  );
};

export default Input;
