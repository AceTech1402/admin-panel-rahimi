import { NavLink } from "react-router-dom";

import classes from "./sidebar.module.scss";

//images
import ProfileImage from "./../../assets/pics/sidebar/profile.png";
import { LogoutIcon } from "../svgs/svgs";

export const Sidebar: React.FC = () => {
  return (
    <div className={classes.sidebar_wrapper}>
      <div className={classes.sidebar}>
        <div className={classes.profile}>
          <div className={classes.image}>
            <img src={ProfileImage} alt="" />
          </div>
          <div className={classes.name}>
            <p>نام کاربری</p>
          </div>
        </div>
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? classes.active : "")}
            >
              کاربران
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/clubs"
              className={({ isActive }) => (isActive ? classes.active : "")}
            >
              کلاب ها
            </NavLink>
          </li>
        </ul>
        <button className={classes.logout}>
          <div className={classes.icon}>
            <LogoutIcon />
          </div>
          <p>خروج</p>
        </button>
      </div>
    </div>
  );
};
