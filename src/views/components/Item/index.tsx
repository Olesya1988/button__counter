import React from "react";
import Button from "../Button/index.tsx";

export const Item: React.FC = ({ item }) => {
  const { id } = item;

  return (
    <div id={id}>
      <Button item={item} />
    </div>
  );
};

export default Item;
