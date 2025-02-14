import { use, useActionState } from "react";
import { formatCurrency, isNotEmpty, isEmail } from "../utils";
import { UserProgressContext } from "../store/UserProgressContext";
import { CartContext } from "../store/CartContext";
import Modal from "./Modal";
import Button from "./Button";
import Input from "./Input";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const [formState, formAction, isPending] = useActionState(placeOrderAction, {
    errors: null,
  });

  const {
    data,
    error: sendingError,
    sendRequest,
    clearData,
  } = useHttp("http://localhost:3000/orders", requestConfig);

  const userProgressCtx = use(UserProgressContext);
  const { cart, clearCart } = use(CartContext);

  async function placeOrderAction(prevState, formData) {
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

    const order = JSON.stringify({
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
    });

    await sendRequest(order);
    return { errors: null };
  }

  const cartTotal = cart.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleCloseCheckout() {
    userProgressCtx.hideCheckout();
  }

  function handleFinish() {
    userProgressCtx.hideCheckout();
    clearCart();
    clearData();
  }

  let actions = (
    <>
      <Button
        textOnly
        onClick={handleCloseCheckout}
      >
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (isPending) {
    actions = <span>Sending order data...</span>;
  }

  if (data && !sendingError) {
    return (
      <Modal
        open={userProgressCtx.progress === "checkout"}
        onClose={handleCloseCheckout}
      >
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>
          We'll get back to you with more details via email within the next few
          minutes.
        </p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal
      className="checkout"
      open={userProgressCtx.progress === "checkout"}
      onClose={handleCloseCheckout}
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
        {/* {formState.errors && (
          <ul>
            {formState.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )} */}

        {sendingError && (
          <Error
            title="Failed to submit order"
            message={sendingError}
          />
        )}

        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
