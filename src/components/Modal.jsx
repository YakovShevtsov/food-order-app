import { forwardRef } from "react";

const Modal = forwardRef(({ children }, ref) => {
  return (
    <dialog
      className="modal"
      ref={ref}
    >
      {children}
    </dialog>
  );
});

export default Modal;
