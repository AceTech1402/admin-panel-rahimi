import { Outlet } from "react-router-dom";

import classes from "./layoutPanel.module.scss";
import { Sidebar } from "./../../components/sidebar/sidebar";

export const Layoutpanel: React.FC = () => {
  return (
    <div className={classes.layout_wrapper}>
      <Sidebar />
      <div className={classes.body}>
        <Outlet />
      </div>
    </div>
  );
};
