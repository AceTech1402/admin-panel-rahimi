import classes from "./notFound.module.scss";

export const NotFound: React.FC = () => {
  return(
    <div className={classes.notfound}>
      <p>404</p>
      <p>صفحه ای پیدا نشد</p>
    </div>
  )
}