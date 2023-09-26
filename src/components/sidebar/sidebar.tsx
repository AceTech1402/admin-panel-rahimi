import { NavLink } from "react-router-dom";

import classes from "./sidebar.module.scss";

//images
import ProfileImage from "./../../assets/pics/sidebar/profile.png";
import { LogoutIcon } from "../svgs/svgs";
import useLogOut from "../../hooks/useLogOut";

export const Sidebar: React.FC = () => {

  const {logOut} = useLogOut();

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
              to="/admin"
              className={({ isActive }) => (isActive ? classes.active : "")}
            >
              کاربران
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/clubs"
              className={({ isActive }) => (isActive ? classes.active : "")}
            >
              کلاب ها
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/payments"
              className={({ isActive }) => (isActive ? classes.active : "")}
            >
              پرداخت ها
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/posts"
              className={({ isActive }) => (isActive ? classes.active : "")}
            >
              پست ها
            </NavLink>
          </li>
        </ul>
        <button className={classes.logout} onClick={() => logOut()}>
          <div className={classes.icon}>
            <LogoutIcon />
          </div>
          <p>خروج</p>
        </button>
      </div>
    </div>
  );
};
