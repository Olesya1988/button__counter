import React from "react";
import styles from "./index.module.scss";
import classNames from "classnames";

export const Counter: React.FC = ({ counter }) => {
  let num = counter;
  if (num > 99) {
    num = "99+";
  }

  return <div className={classNames(styles.primary, styles.size2)}>{num}</div>;
};

export default Counter;
