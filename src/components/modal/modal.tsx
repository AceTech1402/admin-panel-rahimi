import { useState } from "react";

import classes from "./modal.module.scss";

interface ModalProps {
  children: React.ReactNode;
  modalStatus: boolean;
  changeModalStatusFunc: () => void;
}

export const Modal: React.FC<ModalProps> = ({ children, modalStatus }) => {
  const [modalShow, setModalShow] = useState<boolean>(false);

  const hideModalFunc = () => {
    setModalShow(false);
  };

  return (
    <div
      className={`${classes.modal_wrapper} ${
        modalStatus || modalShow ? classes.active : ""
      }`}
    >
      <div className={`${classes.cover}`} onClick={() => hideModalFunc()}></div>
      <div className={`${classes.modal} `}>{children}</div>
    </div>
  );
};
