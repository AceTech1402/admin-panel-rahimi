import classes from "./clubs.module.scss";

export const Clubs: React.FC = () => {
  return(
    <div className={classes.clubs}>
      <div className={classes.header}>
        <div className={classes.title}>
          <h1>کلاب ها</h1>
        </div>
      </div>
    </div>
  )
}