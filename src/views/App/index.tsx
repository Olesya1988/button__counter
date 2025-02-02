import React from "react";
import styles from "./index.module.scss";
import { useStore } from "../../data/stores/useStore.ts";
import Item from "../components/Item/index.tsx";

export const App: React.FC = () => {
  const [items] = useStore((state) => [state.items]);
  return (
    <>
      <h1 className={styles.title}>It's time to make your choice!</h1>
      <img className={styles.img} src="./background.jpg" alt="background image" />
      <div className={styles.container}>
        {items.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </div>
    </>
  );
};

export default App;
