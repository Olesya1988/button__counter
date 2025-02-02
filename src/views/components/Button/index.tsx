import React from "react";
import styles from "./index.module.scss";
import Label from "../Label/index.tsx";
import Counter from "../Counter/index.tsx";
import { useStore } from "../../../data/stores/useStore.ts";

export const Button: React.FC = ({ item }) => {
  const { id, label, counter, loading } = item;

  const [increment] = useStore((state) => [state.increment]);

  return (
    <button className={styles.size2} onClick={() => increment(id)}>
      {loading ? (
        <img className={styles.loading2} src="./rolling.svg" alt="loading" />
      ) : (
        <>
          <Label label={label} />
          <Counter counter={counter} />
        </>
      )}
    </button>
  );
};

export default Button;
