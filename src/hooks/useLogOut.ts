import axios from "axios";
import { useNavigate } from "react-router-dom";

const useLogOut = () => {
  const navigate = useNavigate()
  const logOut = () => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/auth/logout`,{
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token-admin")}`,
      }
    }).then((res) => {
      if (res.data.result) {
        localStorage.removeItem("token-admin");
        navigate("/")
      }
    });
  };

  return {
    logOut,
  };
};

export default useLogOut;
