import classes from "./modal.module.scss";

interface ModalProps {
  children: React.ReactNode;
  modalStatus: boolean;
  closeModal: () => void;
}

export const Modal: React.FC<ModalProps> = ({
  children,
  modalStatus,
  closeModal,
}) => {
  return (
    <div
      className={`${classes.modal_wrapper} ${
        modalStatus ? classes.active : ""
      }`}
    >
      <div className={`${classes.cover}`} onClick={() => closeModal()}></div>
      <div className={`${classes.modal} `}>
        <div className={classes.close_modal} onClick={() => closeModal()}></div>
        {children}
      </div>
    </div>
  );
};
