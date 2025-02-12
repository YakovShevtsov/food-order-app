import { use } from "react";
import { CartContext } from "../store/CartContext";
import Button from "./Button";
import CartItem from "./CartItem";

export default function Cart() {
  const { cart } = use(CartContext);

  return (
    <div className="cart">
      <h2>Your cart</h2>
      {cart.items.length === 0 && <p>Cart is empty. Please add meals</p>}
      {cart.items.length > 0 && (
        <ul>
          {cart.items.map((item) => (
            <CartItem
              key={item.id}
              itemData={item}
            />
          ))}
        </ul>
      )}

      <form
        className="modal-actions"
        method="dialog"
      >
        <Button className="text-button">Close</Button>
        <Button>Go to checkout</Button>
      </form>
    </div>
  );
}
