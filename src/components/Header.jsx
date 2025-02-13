import { use } from "react";
import headerImg from "../assets/logo.jpg";
import Button from "./Button";
import { CartContext } from "../store/CartContext";
import { UserProgressContext } from "../store/UserProgressContext";

export default function Header() {
  const { cart } = use(CartContext);
  const { showCart } = use(UserProgressContext);

  function handleOpenCart() {
    showCart();
  }

  return (
    <header id="main-header">
      <div id="title">
        <img
          src={headerImg}
          alt="Dish in front of city"
        />
        <h1>Reactfood</h1>
      </div>
      <Button
        onClick={handleOpenCart}
        textOnly
      >
        Cart ({cart.items.length})
      </Button>
    </header>
  );
}
