import { FormEvent, FormEventHandler } from "react";
import RegistrationForm from "../components/RegistrationForm";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

const SignUp = () => {
  const handleSubmit: FormEventHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = Object.fromEntries(
      new FormData(e.currentTarget)
    ) as Record<string, string>;
  };
  return (
    <div>
      <RegistrationForm
        title="Sign Up"
        footer={{
          title: "Login",
          linkTo: "/login",
          body: "Already have an account?",
        }}
      >
        <form
          className="my-[34px] flex flex-col gap-y-6"
          onSubmit={handleSubmit}
        >
          <Input name="email" type="email" placeholder="Email address" />
          <Input name="password" type="password" placeholder="Password" />
          <Input
            name="repeat-password"
            type="password"
            placeholder="Repeat Password"
          />
          <Button name="Create an account" />
        </form>
      </RegistrationForm>
    </div>
  );
};

export default SignUp;
