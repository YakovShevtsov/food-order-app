import { useContext } from "react";
import { CartContext } from "../store/CartContext";
import formatCurrency from "../utils/currencyFormatter";

export default function CartItem({ itemData }) {
  const { addItem, removeItem } = useContext(CartContext);

  const { name, id, quantity, price } = itemData;

  return (
    <li className="cart-item">
      <p>
        {name} - {quantity} x {formatCurrency(price * quantity)}
      </p>
      <p className="cart-item-actions">
        <button onClick={() => addItem(itemData)}>+</button>
        <span>{quantity}</span>
        <button onClick={() => removeItem(id)}>-</button>
      </p>
    </li>
  );
}
