import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface MessageValues {
  text: string;
  status: boolean;
}

const useLoginHook = () => {
  const [sending, setSending] = useState<boolean>(false);
  const navigate = useNavigate();
  const [message, setMessage] = useState<MessageValues>({
    text: "",
    status: false,
  });

  const removeMessage = () => {
    setTimeout(() => {
      setMessage({
        text: "",
        status: false,
      });
    }, 3000);
  };

  const loginSubmitApi = (data: any) => {
    setSending(true);
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/auth/login`, data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.result) {
          setSending(false);

          localStorage.setItem("token-admin", res.data.data.token);
          setMessage({
            text: "شما با موفقیت ورود کردین",
            status: true,
          });
          setTimeout(() => {
            navigate("/admin");
          }, 1500);
        } else {
          setSending(false);
          setMessage({
            text: "نام کاربری یا رمز عبور اشتباه است.",
            status: false,
          });
        }
      });
  };

  return {
    loginSubmitApi,
    sending,
    message,
    removeMessage,
  };
};

export default useLoginHook;
