import { use, useActionState, useState } from "react";
import { formatCurrency, isNotEmpty, isEmail } from "../utils";
import { UserProgressContext } from "../store/UserProgressContext";
import { CartContext } from "../store/CartContext";
import Modal from "./Modal";
import Button from "./Button";
import Input from "./Input";

export default function Checkout() {
  const [formState, formAction, pending] = useActionState(placeOrderAction, {
    errors: null,
  });
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { userProgress, hideCheckout } = use(UserProgressContext);
  const { cart } = use(CartContext);

  async function fetchPlaceOrder(orderData) {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:3000/orders", {
        method: "POST",
        body: JSON.stringify(orderData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to submit the order. Please, try again later.");
      }

      const resData = await response.json();

      return resData.message;
    } catch (error) {
      setError({
        message: error.message || "An error occured. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  function placeOrderAction(prevState, formData) {
    const name = formData.get("fullName");
    const email = formData.get("email");
    const street = formData.get("street");
    const postalCode = formData.get("postalCode");
    const city = formData.get("city");

    let errors = [];

    if (!isNotEmpty(name)) {
      errors.push("Please enter your full name.");
    }
    if (!isEmail(email)) {
      errors.push("Please enter a valid email address.");
    }

    if (errors.length > 0) {
      return {
        errors,
        values: {
          name,
          email,
          street,
          postalCode,
          city,
        },
      };
    }

    const order = {
      order: {
        items: [...cart.items],
        customer: {
          name,
          email,
          street,
          ["postal-code"]: postalCode,
          city,
        },
      },
    };

    fetchPlaceOrder(order);
    return { errors: null };
  }

  const cartTotal = cart.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleCloseCheckout() {
    hideCheckout();
  }

  return (
    <Modal
      className="checkout"
      open={userProgress === "checkout"}
    >
      <h2>Checkout</h2>
      <p>Total amount: {formatCurrency(cartTotal)}</p>

      <form action={formAction}>
        <Input
          label="Full Name"
          name="fullName"
          type="text"
          id="fullName"
          defaultValue={formState.values?.name}
          required
        />
        <Input
          label="Email Address"
          name="email"
          type="email"
          id="email"
          defaultValue={formState.values?.email}
          required
        />
        <Input
          label="Street"
          name="street"
          type="text"
          id="street"
          defaultValue={formState.values?.street}
          required
        />
        <div className="control-row">
          <Input
            label="Postal Code"
            name="postalCode"
            type="number"
            id="postalCode"
            defaultValue={formState.values?.postalCode}
            required
          />
          <Input
            label="City"
            name="city"
            type="text"
            id="city"
            defaultValue={formState.values?.city}
            required
          />
        </div>
        {formState.errors && (
          <ul>
            {formState.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}

        <p className="modal-actions">
          <Button
            textOnly
            onClick={handleCloseCheckout}
          >
            Close
          </Button>
          <Button
            type="submit"
            disabled={pending}
          >
            Submit
          </Button>
        </p>
      </form>
    </Modal>
  );
}
