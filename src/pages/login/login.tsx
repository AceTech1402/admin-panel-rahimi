import { useForm } from "react-hook-form";
import classes from "./login.module.scss";
import useLoginHook from "../../hooks/login";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface FromValues {
  username: string;
  password: string;
}

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<FromValues>();

  const { loginSubmitApi, sending, message, removeMessage } = useLoginHook();

  const submitLogin = (data: any) => {
    console.log(data);
    loginSubmitApi(data);
  };

  useEffect(() => {
    if (message.text !== "") {
      removeMessage();
    }
  }, [message]);

  useEffect(() => {
    if (localStorage.getItem("token-admin")) {
      navigate("/admin");
    }
  }, []);

  return (
    <div className={classes.login}>
      <div className={classes.title}>
        <h1>ورود</h1>
      </div>

      {message.text !== "" ? (
        <div
          className={`${classes.message} ${
            message.status ? classes.success : classes.wrong
          }`}
        >
          <p>{message.text}</p>
        </div>
      ) : null}

      <form onSubmit={handleSubmit(submitLogin)}>
        <div className={classes.input}>
          <label>
            <span>نام کاربری</span>
            <input
              type="text"
              {...register("username", {
                required: "لطفا نام کاربری خود را وارد کنید",
              })}
            />
          </label>
          {errors.username && (
            <span className={classes.error}>{errors.username.message}</span>
          )}
        </div>
        <div className={classes.input}>
          <label>
            <span>رمز عبور</span>
            <input
              type="password"
              {...register("password", {
                required: "لطفا رمز عبور خود را وارد کنید",
              })}
            />
          </label>
          {errors.password && (
            <span className={classes.error}>{errors.password.message}</span>
          )}
        </div>
        <div className={classes.buttons}>
          <button type="submit" className={classes.button}>
            {sending ? <p>در حال ورود ...</p> : <p>ورود</p>}
          </button>
        </div>
      </form>
    </div>
  );
};
