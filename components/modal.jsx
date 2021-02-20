import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useDarkTheme } from "../context/themeContext";

const ModalWrapper = ({ children }) => {
  const darkTheme = useDarkTheme();
  return (
    <div className="w-full h-full flex justify-center items-center bg-gray-600 bg-opacity-75">
      <div
        className={`relative ${
          darkTheme ? "bg-gray-800" : "bg-white"
        } overflow-y-scroll max-h-screen shadow-xl rounded-md p-4 m-4 w-full md:p-8 md:m-8 lg:w-auto`}
        style={{ minWidth: "320px" }}
      >
        {children}
      </div>
    </div>
  );
};

const Modal = ({ children, id, isOpen, closeOnEsc = true, onClose }) => {
  const ref = useRef();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const body = document.querySelector("body");
    const modalRoot = document.querySelector("#modal-root");
    if (isOpen) {
      body.style.overflowY = "hidden";
      const modalElement = document.createElement("div");
      modalElement.style.display = "flex";
      modalElement.style.position = "relative";
      modalElement.style.height = "100%";

      modalRoot.style.zIndex = 1;

      if (modalRoot) {
        if (id) {
          modalElement.id = id;
        }
        modalElement.style.zIndex = (
          3000 +
          modalRoot.children.length * 10
        ).toString();

        modalRoot.appendChild(modalElement);
        ref.current = modalElement;

        setMounted(true);
      }
    }
    return () => {
      body.style.overflowY = null;
      setMounted(false);
      if (ref.current) {
        modalRoot?.removeChild(ref.current);
        ref.current = undefined;
        modalRoot.style.zIndex = modalRoot.children.length > 0 ? 1 : -1;
      }
    };
  }, [id, isOpen]);

  useEffect(() => {
    const dismissModal = (e) => {
      if (e.code === "Escape") {
        onClose();
      }
    };

    if (isOpen && closeOnEsc) {
      window.addEventListener("keydown", dismissModal);
      return () => {
        window.removeEventListener("keydown", dismissModal);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return mounted && ref.current
    ? createPortal(<ModalWrapper>{children}</ModalWrapper>, ref.current)
    : null;
};

export default Modal;
