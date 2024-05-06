import { MdMovieCreation } from "react-icons/md";
import { FC, ReactNode } from "react";
interface FormProps {
  children: ReactNode;
  title: string;
  footer: {
    title: string;
    linkTo: string;
    body: string;
  };
}
const RegistrationForm: FC<FormProps> = ({ title, children, footer }) => {
  return (
    <div className="flex flex-col items-center justify-center  ">
      <MdMovieCreation className="my-12 md:my-20 text-primaryRed w-10 h-10" />
      <div className="bg-semiDarkBlue w-[90%] md:w-[400px]  px-6 py-5  rounded-lg">
        <h1 className="text-headingLg">{title}</h1>
        {children}
        <p className="text-center">
          {footer.body}{" "}
          <a href={footer.linkTo} className="text-primaryRed">
            {footer.title}
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegistrationForm;
