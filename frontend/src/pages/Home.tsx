import { useEffect, useState } from "react";
import { getCategories } from "../api/categories";
import { NavBar } from "../components/NavBar";
import { Header } from "../components/Header";
import { Catalog } from "../components/Catalog";


function Home() {


  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      <Header />
      <div className="flex-1 overflow-hidden">

      <Catalog />
      </div>
      <NavBar />
    </div>
  );
}

export default Home;