import { useState } from "react";
import { ArrowICon } from "../svgs/svgs";
import classes from "./selectBox.module.scss";

interface SelectBoxProps {
  items: any[];
  chooseItemFunc: () => void;
  listStatus: boolean;
  changeStatusBox: () => void;
  label: string;
}

export const SelectBox: React.FC<SelectBoxProps> = ({
  items,
  listStatus,
  chooseItemFunc,
  changeStatusBox,
  label
}) => {
  return (
    <div
      className={`${classes.select_box} ${listStatus ? classes.active : ""}`}
    >
      <div className={classes.label}>
        <p>{label}</p>
      </div>
      <div className={classes.choose_item} onClick={() => changeStatusBox()}>
        <p></p>
        <div className={classes.icon}>
          <ArrowICon />
        </div>
      </div>
      <ul className={classes.list}>
        <li
          data-category-id={null}
          onClick={() => chooseItemFunc()}
        >
          <p>لطفا یک دسته بندی را انتخاب کنین</p>
        </li>
        {items.map((item) => (
          <li
            key={item.categories__id}
            data-category-id={item.categories__id}
            data-type={item.type}
            onClick={() => chooseItemFunc()}
          >
            <p>{item.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
