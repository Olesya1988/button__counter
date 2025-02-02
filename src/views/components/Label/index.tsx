import React from "react";
import styles from "./index.module.scss";

export const Label: React.FC = ({ label }) => {
  return <div className={styles.primary}>{label}</div>;
};

export default Label;
