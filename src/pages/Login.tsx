import { FormEvent, FormEventHandler, useEffect } from "react";
import RegistrationForm from "../components/shared/RegistrationForm";
import Input from "../components/shared/Input";
import Button from "../components/shared/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createSessionID, loginUser } from "../state/auth/authSlice";
import { AppDispatch, RootState } from "../state/store";
import Error from "../components/shared/Error";

const Login = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { sessionId, requestToken, error, loading } = useSelector(
    (state: RootState) => state.auth
  );

  const handleSubmit: FormEventHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const formData = Object.fromEntries(
    //   new FormData(e.currentTarget)
    // ) as Record<string, string>;
    dispatch(loginUser());
  };
  useEffect(() => {
    if (requestToken) dispatch(createSessionID(requestToken));
  }, [requestToken]);

  useEffect(() => {
    if (sessionId) navigate("/", { replace: true });
  }, [sessionId]);

  if (error) return <Error message="Error When Login " />;
  return (
    <div>
      <RegistrationForm
        title="Login"
        footer={{
          title: "Sign Up",
          linkTo: "https://www.themoviedb.org/signup",
          body: "Don't have an account?",
        }}
      >
        <form className="my-8 flex flex-col gap-y-6" onSubmit={handleSubmit}>
          <Input name="email" type="email" placeholder="Email address" />
          <Input name="password" type="password" placeholder="Password" />
          <Button
            name="Login to your account"
            disabled={loading ? true : false}
          />
        </form>
      </RegistrationForm>
    </div>
  );
};

export default Login;
