import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import classes from "./layoutPanel.module.scss";
import { Sidebar } from "./../../components/sidebar/sidebar";

export const Layoutpanel: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token-admin")) {
      navigate("/");
    }
  }, []);

  return (
    <div className={classes.layout_wrapper}>
      <Sidebar />
      <div className={classes.body}>
        <Outlet />
      </div>
    </div>
  );
};
