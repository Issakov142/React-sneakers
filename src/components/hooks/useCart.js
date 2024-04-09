import React from "react";
import AppContext from "../../context";

export const useCart = () => {
  const { catItems, setCartItems } = React.useContext(AppContext);
  const totalPrice = catItems.reduce((sum, obj) => obj.price + sum, 0);

  return { catItems, totalPrice, setCartItems };
};
