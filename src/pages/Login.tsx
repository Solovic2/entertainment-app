import { FormEvent, FormEventHandler } from "react";
import RegistrationForm from "../components/RegistrationForm";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const handleSubmit: FormEventHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = Object.fromEntries(
      new FormData(e.currentTarget)
    ) as Record<string, string>;
    console.log(formData);
    navigate("/", { replace: true });
  };
  return (
    <div>
      <RegistrationForm
        title="Login"
        footer={{
          title: "Sign Up",
          linkTo: "/sign-up",
          body: "Don't have an account?",
        }}
      >
        <form
          className="my-[34px] flex flex-col gap-y-6"
          onSubmit={handleSubmit}
        >
          <Input name="email" type="email" placeholder="Email address" />
          <Input name="password" type="password" placeholder="Password" />
          <Button name="Login to your account" />
        </form>
      </RegistrationForm>
    </div>
  );
};

export default Login;
