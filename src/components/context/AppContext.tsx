import React, { useEffect, useState } from "react";

type ICartState = {
  cart?: any;
};

type ICartContext = [ICartState, React.Dispatch<React.SetStateAction<ICartState>>];

export const AppContext = React.createContext<ICartContext>([{}, () => { }]);

export const AppProvider = (props) => {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    if (process['browser']) {
      let cartData = localStorage.getItem("woo-next-cart");
      cartData = null !== cartData ? JSON.parse(cartData) : "";
      setCart(cartData);
    }
  }, []);

  return (
    <AppContext.Provider value={[cart, setCart]}>
      {props.children}
    </AppContext.Provider>
  );
};
