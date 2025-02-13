import { createContext, useEffect, useReducer, useState } from "react";

export const CartContext = createContext({
  addItem: (item) => {},
  removeItem: (id) => {},
  items: [],
});

function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const updatedItems = [...state.items];

    if (existingCartItemIndex > -1) {
      const existingItem = state.items[existingCartItemIndex];

      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }

    return { ...state, items: updatedItems };
  }

  if (action.type === "REMOVE_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    const existingItem = state.items[existingCartItemIndex];
    const updatedItems = [...state.items];

    if (existingItem.quantity > 1) {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity - 1,
      };

      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      const filteredItems = updatedItems.filter(
        (item) => item.id !== action.id
      );
      return { ...state, items: filteredItems };
    }

    return { ...state, items: updatedItems };
  }

  return state;
}

export default function CartContextProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  function addItem(item) {
    dispatch({ type: "ADD_ITEM", item });
  }

  function removeItem(id) {
    dispatch({ type: "REMOVE_ITEM", id });
  }

  const cartCtx = {
    addItem,
    removeItem,
    cart: state,
  };

  return <CartContext value={cartCtx}>{children}</CartContext>;
}
