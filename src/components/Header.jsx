import { use, useRef } from "react";
import headerImg from "../assets/logo.jpg";
import { CartContext } from "../store/CartContext";
import Button from "./Button";
import Modal from "./Modal";
import Cart from "./Cart";

export default function Header() {
  const { cart } = use(CartContext);
  const modal = useRef();

  function handleOpenCart() {
    modal.current.showModal();
  }

  return (
    <>
      <Modal ref={modal}>
        <Cart />
      </Modal>
      <header id="main-header">
        <div id="title">
          <img
            src={headerImg}
            alt="Dish in front of city"
          />
          <h1>Reactfood</h1>
        </div>
        <Button
          textOnly
          onClick={handleOpenCart}
        >
          Cart ({cart.items.length})
        </Button>
      </header>
    </>
  );
}
