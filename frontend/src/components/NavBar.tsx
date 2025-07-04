// bottom navbar component
import React from "react";
import cart from "../assets/cart.svg";
import store from "../assets/store.svg";
import { useUiStore } from "../store/useUiStore";
import { CategoryDropdown } from "./CategoryDropdown";
// get home svg from daisyui icons

export const NavBar = ({
  categoryRefs,
}: {
  categoryRefs: React.MutableRefObject<Record<number, HTMLDivElement | null>>;
}) => {
  const activePage = useUiStore((s) => s.activePage);
  const setActivePage = useUiStore((s) => s.setActivePage);
  return (
    <nav className="fixed bottom-0 left-0 flex w-full justify-center p-4">
      <ul className="menu bg-base-200 lg:menu-horizontal rounded-box flex flex-row">
        {activePage === "store" &&<li>
          
          <CategoryDropdown categoryRefs={categoryRefs} />
        </li>}
        {activePage === "cart" && <li>
          <button onClick={() => setActivePage("store")}>
            <img src={store} alt="Store" className="h-5 w-5" />
            Store
          </button>
        </li>}
        <li>
          <button onClick={() => setActivePage("cart")}>
            <img src={cart} alt="Cart" className="h-5 w-5" />
            Cart
          </button>
        </li>
      </ul>
    </nav>
  );
};
