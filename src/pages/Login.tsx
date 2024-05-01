import { FormEvent, FormEventHandler } from "react";
import RegistrationForm from "../components/RegistrationForm";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../state/auth/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit: FormEventHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = Object.fromEntries(
      new FormData(e.currentTarget)
    ) as Record<string, string>;
    console.log(formData);
    dispatch(loginUser()).then((res) => {
      if (res.payload) {
        window.location.href = `https://www.themoviedb.org/authenticate/${res?.payload?.request_token}?redirect_to=http://localhost:5173/
        `;
      }
    });

    // navigate("/", { replace: true });
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
