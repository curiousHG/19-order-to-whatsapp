import { NavBar } from "../components/NavBar";
import { Header } from "../components/Header";
import { Catalog } from "../components/Catalog";
import { SearchBar } from "../components/SearchBar";
import { useUiStore } from "../store/useUiStore";
import { OrderCart } from "../components/OrderCart";
import { useRef } from "react";

function Home() {
  const activePage = useUiStore((s) => s.activePage);
  const categoryRefs = useRef<Record<number, HTMLDivElement | null>>({});

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div
        id="fixed-header"
        className="fixed top-0 left-0 z-5 flex w-full flex-col items-center bg-white p-2 shadow-xs backdrop-blur-md"
      >
        <Header />
        {activePage === "store" && (
          <div className="mt-1 flex w-full flex-1 justify-around">
            {/* <CategoryDropdown categoryRefs={categoryRefs} /> */}
            <SearchBar />
          </div>
        )}

        {/* <CategorySlider />
        <SearchBar /> */}
      </div>
      {/* catalog should start after the search bar ends */}
      <div
        className={`flex w-full flex-1 flex-col overflow-hidden ${activePage === "store" ? "mt-30" : "mt-20"}`}
      >
        {activePage === "store" ? (
          <Catalog categoryRefs={categoryRefs} />
        ) : (
          <OrderCart />
        )}
      </div>
      <NavBar categoryRefs={categoryRefs}/>
    </div>
  );
}

export default Home;
