import { Outlet } from "react-router-dom";
import classes from "./layoutAuth.module.scss";

export const LayoutAuth: React.FC = () => {
  return (
    <div className={classes.auth_layout}>
      <Outlet />
    </div>
  );
};
