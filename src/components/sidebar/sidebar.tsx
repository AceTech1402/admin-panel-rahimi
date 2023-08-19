import classes from "./sidebar.module.scss";

//images 
import ProfileImage from "./../../assets/pics/sidebar/profile.png";
import { NavLink } from "react-router-dom";

export const Sidebar: React.FC = () => {
  return(
    <div className={classes.sidebar_wrapper}>
      <div className={classes.sidebar}>
          <div className={classes.header}>
              <div className={classes.profile}>
                <div className={classes.image}>
                  <img src={ProfileImage} alt="" />
                </div>
                <div className={classes.name}>
                  <p>نام کاربری</p>
                </div>
              </div>
          </div>
          <ul>
            <li>
              <NavLink to="/">
                کاربران
              </NavLink>
            </li>
            <li>
              <NavLink to="/clubs">
                کلاب ها
              </NavLink>
            </li>
          </ul>
      </div>
    </div>
  )
}