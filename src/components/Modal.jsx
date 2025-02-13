import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, className, open }) {
  let modalClasses = "modal " + className;
  const dialog = useRef();

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    }
  }, [open]);

  return createPortal(
    <dialog
      className={modalClasses}
      ref={dialog}
    >
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}
