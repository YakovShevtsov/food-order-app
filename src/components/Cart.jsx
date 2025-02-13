import { use } from "react";
import { CartContext } from "../store/CartContext";
import Button from "./Button";
import CartItem from "./CartItem";
import Modal from "./Modal";
import { UserProgressContext } from "../store/UserProgressContext";
import formatCurrency from "../utils/currencyFormatter.js";

export default function Cart() {
  const { cart } = use(CartContext);
  const { userProgress, hideCart, showCheckout } = use(UserProgressContext);

  const cartTotal = cart.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleCloseCart() {
    hideCart();
  }

  function handleShowCheckout() {
    showCheckout();
  }

  return (
    <Modal
      className="cart"
      open={userProgress === "cart"}
    >
      <h2>Your cart</h2>
      {cart.items.length === 0 && <p>Cart is empty. Please add meals</p>}
      {cart.items.length > 0 && (
        <ul>
          {cart.items.map((item) => {
            return (
              <CartItem
                key={item.id}
                itemData={item}
              />
            );
          })}
        </ul>
      )}
      <p className="cart-total">Total: {formatCurrency(cartTotal)}</p>
      <form
        className="modal-actions"
        method="dialog"
      >
        <Button
          textOnly
          onClick={handleCloseCart}
        >
          Close
        </Button>
        {cart.items.length > 0 && (
          <Button onClick={handleShowCheckout}>Go to checkout</Button>
        )}
      </form>
    </Modal>
  );
}
