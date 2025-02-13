import { createContext, useState } from "react";

export const UserProgressContext = createContext({
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {},
});

export default function UserProgressContextProvider({ children }) {
  const [userProgress, setUserProgress] = useState("");

  function handleShowCart() {
    setUserProgress("cart");
  }

  function handleHideCart() {
    setUserProgress("");
  }

  function handleShowCheckout() {
    setUserProgress("checkout");
  }

  function handleHideCheckout() {
    setUserProgress("");
  }

  const UserProgressCtx = {
    showCart: handleShowCart,
    hideCart: handleHideCart,
    showCheckout: handleShowCheckout,
    hideCheckout: handleHideCheckout,
    userProgress,
  };

  return (
    <UserProgressContext.Provider value={UserProgressCtx}>
      {children}
    </UserProgressContext.Provider>
  );
}
