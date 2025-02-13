import { use } from "react";
import formatCurrency from "../utils/currencyFormatter";
import { UserProgressContext } from "../store/UserProgressContext";
import { CartContext } from "../store/CartContext";
import Modal from "./Modal";
import Button from "./Button";
import Input from "./Input";

export default function Checkout() {
  const { cart } = use(CartContext);
  const { userProgress, hideCart } = use(UserProgressContext);

  const cartTotal = cart.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleCloseCart() {
    hideCart();
  }

  return (
    <Modal
      className="checkout"
      open={userProgress === "checkout"}
    >
      <h2>Checkout</h2>
      <p>Total amount: {formatCurrency(cartTotal)}</p>

      <form action="">
        <Input
          label="Full Name"
          name="fullName"
          type="text"
          id="fullName"
        />
        <Input
          label="Email Address"
          name="email"
          type="email"
          id="email"
        />
        <Input
          label="Street"
          name="street"
          type="text"
          id="street"
        />
        <div className="control-row">
          <Input
            label="Postal Code"
            name="postalCode"
            type="number"
            id="postalCode"
          />
          <Input
            label="City"
            name="city"
            type="text"
            id="city"
          />
        </div>
      </form>

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
        <Button>Submit</Button>
      </form>
    </Modal>
  );
}
