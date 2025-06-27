import { NavBar } from "../components/NavBar";
import { Header } from "../components/Header";
import { Catalog } from "../components/Catalog";
import { SearchBar } from "../components/SearchBar";
import { CategorySlider } from "../components/CategorySlider";

function Home() {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <div className="flex flex-col items-center p-2 fixed top-0 left-0 w-full z-10 bg-blurred-100 bg-white ">
        <Header />
        <CategorySlider />
        <SearchBar />
      </div>
      {/* catalog should start after the search bar ends */}
      <div className="flex-1 overflow-hidden mt-50">
        <Catalog />
      </div>
      <NavBar />
    </div>
  );
}

export default Home;
