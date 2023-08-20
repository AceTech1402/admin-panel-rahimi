import { useState } from "react";

import classes from "./clubs.module.scss";

import { TableAcceptedClubs } from "../../components/clubs/table-accepted-clubs/tableAcceptedClubs";
import { TableRejectedClubs } from "../../components/clubs/rejected-accepted-clubs/tabletableRejectedUsersClubs";
import { TableAllClubs } from "../../components/clubs/table-all-clubs/tableAllClubs";

export const Clubs: React.FC = () => {
  const [tabs, setTabs] = useState<string>("all-clubs");

  return (
    <div className={classes.users}>
      <div className={classes.header}>
        <div className={classes.title}>
          <h1>کلاب ها</h1>
        </div>
      </div>
      <div className={classes.body}>
        <div className={classes.tabs}>
          <ul>
            <li
              className={tabs === "all-clubs" ? classes.active : ""}
              onClick={() => {
                setTabs("all-clubs");
              }}
            >
              <p>همه کلاب ها</p>
            </li>
            <li
              className={tabs === "accepted-clubs" ? classes.active : ""}
              onClick={() => {
                setTabs("accepted-clubs");
              }}
            >
              <p>قبول شده ها</p>
            </li>
            <li
              className={tabs === "rejected-clubs" ? classes.active : ""}
              onClick={() => {
                setTabs("rejected-clubs");
              }}
            >
              <p>رد شده ها</p>
            </li>
          </ul>
        </div>
        {tabs === "all-clubs" ? (
          <TableAllClubs />
        ) : tabs === "accepted-clubs" ? (
          <TableAcceptedClubs />
        ) : tabs === "rejected-clubs" ? (
          <TableRejectedClubs />
        ) : null}
      </div>
    </div>
  );
};
