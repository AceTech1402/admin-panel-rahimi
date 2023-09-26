import classes from "./input.module.scss";

interface InputProps {
  label?: string;
  children: React.ReactNode;
  message?: string;
  full?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  message,
  children,
  full,
}) => {
  return (
    <div className={`${classes.input} ${full ? classes.full : ""}`}>
      <label>
        {label && <span>{label}</span>}
        {children}
      </label>
      {message && <span className={classes.error}>{message}</span>}
    </div>
  );
};
