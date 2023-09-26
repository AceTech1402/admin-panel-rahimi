import { useForm } from "react-hook-form";
import classes from "./login.module.scss";
import useLoginHook from "../../hooks/useLogin";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "./../../components/input/input";

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
        <Input
          message={errors.username && errors.username.message}
          label="نام کاربری"
        >
          <input
            type="text"
            {...register("username", {
              required: "لطفا نام کاربری خود را وارد کنید",
            })}
          />
        </Input>
        <Input
          message={errors.password && errors.password.message}
          label="رمز عبور"
        >
          <input
            type="password"
            {...register("password", {
              required: "لطفا رمز عبور خود را وارد کنید",
            })}
          />
        </Input>
        <div className={classes.buttons}>
          <button type="submit" className={classes.button}>
            {sending ? <p>در حال ورود ...</p> : <p>ورود</p>}
          </button>
        </div>
      </form>
    </div>
  );
};
