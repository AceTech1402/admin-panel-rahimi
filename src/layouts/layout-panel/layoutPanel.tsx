import { Outlet } from "react-router-dom"

import classes from "./layoutPanel.module.scss";

export const Layoutpanel: React.FC = () => {
  return(
    <div className={classes.layout_wrapper}>
      <Outlet />
    </div>
  )
}