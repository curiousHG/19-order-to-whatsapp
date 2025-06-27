// bottom navbar component
import React from "react";
import cart from "../assets/cart.svg";
import store from "../assets/store.svg";
// get home svg from daisyui icons

export const NavBar: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 flex justify-center p-4 w-full">
      <ul className="menu bg-base-200 lg:menu-horizontal rounded-box flex flex-row">
        <li>
          <a>
            <img src={store} alt="Store" className="h-5 w-5" />
            Store
          </a>
        </li>
        <li>
          <a>
            <img src={cart} alt="Cart" className="h-5 w-5" />
            Cart
          </a>
        </li>
      </ul>
    </nav>
  );
};
