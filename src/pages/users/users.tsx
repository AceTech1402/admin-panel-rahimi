import { NavLink } from "react-router-dom";
import classes from "./users.module.scss";
import { useState } from "react";
import { SearchIcon } from "../../components/svgs/svgs";
import { TableAllUsers } from "../../components/users/table-all-users/tableAllUsers";
import { TableAcceptedUsers } from "../../components/users/table-accepted-users/tableAcceptedUsers";
import { TableRejectedUsers } from "../../components/users/rejected-accepted-users/tabletableRejectedUsersUsers";

export const Users: React.FC = () => {
  const [tabs, setTabs] = useState<string>("all-users");

  return (
    <div className={classes.users}>
      <div className={classes.header}>
        <div className={classes.title}>
          <h1>کاربران</h1>
        </div>
      </div>
      <div className={classes.body}>
        <div className={classes.tabs}>
          <ul>
            <li
              className={tabs === "all-users" ? classes.active : ""}
              onClick={() => {
                setTabs("all-users");
              }}
            >
              <p>همه کاربران</p>
            </li>
            <li
              className={tabs === "accepted-users" ? classes.active : ""}
              onClick={() => {
                setTabs("accepted-users");
              }}
            >
              <p>قبول شده ها</p>
            </li>
            <li
              className={tabs === "rejected-users" ? classes.active : ""}
              onClick={() => {
                setTabs("rejected-users");
              }}
            >
              <p>رد شده ها</p>
            </li>
          </ul>
        </div>
        {tabs === "all-users" ? (
          <TableAllUsers />
        ) : tabs === "accepted-users" ? (
          <TableAcceptedUsers />
        ) : tabs === "rejected-users" ? (
          <TableRejectedUsers />
        ) : null}
      </div>
    </div>
  );
};
