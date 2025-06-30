// bottom navbar component
import React from "react";
import cart from "../assets/cart.svg";
import store from "../assets/store.svg";
import { useUiStore } from "../store/useUiStore";
// get home svg from daisyui icons

export const NavBar: React.FC = () => {
  const activePage = useUiStore((s) => s.activePage);
  const setActivePage = useUiStore((s) => s.setActivePage);
  return (
    <nav className="fixed bottom-0 left-0 flex justify-center p-4 w-full">
      <ul className="menu bg-base-200 lg:menu-horizontal rounded-box flex flex-row">
        <li>
          <button
            onClick={() => setActivePage("store")}
            className={activePage === "store" ? "active" : ""}
          >
            <img src={store} alt="Store" className="h-5 w-5" />
            Store
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              setActivePage("cart")
              window.scrollTo({top: 0})
            }}
            className={activePage === "cart" ? "active" : ""}
          >
            <img src={cart} alt="Cart" className="h-5 w-5" />
            Cart
          </button>
        </li>
      </ul>
    </nav>
  );
};
