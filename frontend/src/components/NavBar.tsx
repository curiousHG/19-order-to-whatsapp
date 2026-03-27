// bottom navbar component
import cart from "../assets/cart.svg";
import store from "../assets/store.svg";
import { useUiStore } from "../store/useUiStore";

export const NavBar = () => {
  const activePage = useUiStore((s) => s.activePage);
  const setActivePage = useUiStore((s) => s.setActivePage);

  // Determine icon and label based on active page
  const isCart = activePage === "cart";
  const icon = isCart ? store : cart;
  const label = isCart ? "Store" : "Cart";
  const nextPage = isCart ? "store" : "cart";

  return (
    <button
      onClick={() => setActivePage(nextPage)}
      className="bg-base-300 hover:bg-base-500 fixed bottom-5 left-3 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-colors"
      aria-label={label}
    >
      <img src={icon} alt={label} className="h-8 w-8" />
    </button>
  );
};
