import { NavBar } from "../components/NavBar";
import { Header } from "../components/Header";
import { Catalog } from "../components/Catalog";
import { SearchBar } from "../components/SearchBar";
import { CategorySlider } from "../components/CategorySlider";
import { useUiStore } from "../store/useUiStore";
import { OrderCart } from "../components/OrderCart";
import { useRef } from "react";

function Home() {
  const activePage = useUiStore((s) => s.activePage);
  const categoryRefs = useRef<Record<number, HTMLDivElement | null>>({});

  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <div id="fixed-header" className="flex flex-col items-center p-2 fixed top-0 left-0 w-full z-5 bg-white backdrop-blur-md shadow-xs">
        <Header />
        {activePage === "store" && <><CategorySlider categoryRefs={categoryRefs}/> <SearchBar/></>}

        {/* <CategorySlider />
        <SearchBar /> */}
      </div>
      {/* catalog should start after the search bar ends */}
      <div className={`flex flex-col flex-1 overflow-hidden w-full ${activePage === "store" ? "mt-44" : "mt-20"}`}>
        {activePage === "store" ? <Catalog categoryRefs={categoryRefs} /> : <OrderCart />}
      </div>
      <NavBar />
    </div>
  );
}

export default Home;
