import classes from "./users.module.scss";

export const Users: React.FC = () => {
  return(
    <div className={classes.users}>
      <div className={classes.header}>
        <div className={classes.title}>
          <h1>کاربران</h1>
        </div>
      </div>
    </div>
  )
}