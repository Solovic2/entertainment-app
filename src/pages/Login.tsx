import Button from "../components/shared/Button";
import { useDispatch, useSelector } from "react-redux";
import { createSessionID, loginUser } from "../state/auth/authSlice";
import { AppDispatch, RootState } from "../state/store";
import { MdMovieCreation } from "react-icons/md";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch: AppDispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(loginUser()).then((res) =>
      dispatch(createSessionID(res.payload.request_token))
    );
  };
  useEffect(() => {
    toast.error(error);
  }, [error]);

  return (
    <div>
      <div className="flex flex-col items-center justify-center  ">
        <MdMovieCreation className="my-12 md:my-20 text-primaryRed w-10 h-10" />
        <div className="bg-semiDarkBlue w-[90%] sm:w-[60%] md:w-[400px] px-6 py-5 rounded-lg">
          <h1 className="text-headingLg">Login</h1>
          <div className="my-8 flex flex-col gap-y-6">
            <p className="text-bodyM">Login to add bookmarks as you want!</p>
            <Button
              onClick={handleSubmit}
              name="Login to your account"
              disabled={loading ? true : false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
