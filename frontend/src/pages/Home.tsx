import { NavBar } from "../components/NavBar";
import { Header } from "../components/Header";
import { Catalog } from "../components/Catalog";
import { SearchBar } from "../components/SearchBar";
import { useUiStore } from "../store/useUiStore";
import { OrderCart } from "../components/OrderCart";
import { useRef } from "react";
import { CategoryDropdown } from "../components/CategoryDropdown";
import type { VirtuosoHandle } from "react-virtuoso";
import { ProductQuantityDrawer } from "../components/ProductQuantityDrawer";
import { useProductQuantityDrawerStore } from "../store/useProductQuantityDrawerStore";

function Home() {
  const activePage = useUiStore((s) => s.activePage);
  // Store virtuoso ref separately
  const virtuosoRef = useRef<VirtuosoHandle>(null);
  const { open, closeDrawer } = useProductQuantityDrawerStore();

  // Fixed header height
  const HEADER_HEIGHT = activePage === "store" ? "h-28" : "h-20";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div
        id="fixed-header"
        className={`fixed top-0 left-0 z-50 flex w-full flex-col items-center bg-white px-3 shadow-md ${HEADER_HEIGHT}`}
      >
        <Header />
        {activePage === "store" && (
          <div className="mt-1 flex w-full flex-1 justify-around">
            <CategoryDropdown virtuosoRef={virtuosoRef} />
            <SearchBar />
          </div>
        )}
      </div>
      <div
         className={`flex w-full flex-1 flex-col overflow-hidden`}
      >
        <div className={activePage === "store" ? "block" : "hidden"}>
          <Catalog ref={virtuosoRef} />
        </div>
        <div className={activePage === "cart" ? "block" : "hidden"}>
          <OrderCart />
        </div>
      </div>
      <NavBar />
      <ProductQuantityDrawer open={open} onClose={closeDrawer} />
    </div>
  );
}

export default Home;
