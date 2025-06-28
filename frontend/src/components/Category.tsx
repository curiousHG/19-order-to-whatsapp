import { Product } from "./Product";
import Unknown from "../assets/Unknown.jpeg";
import { useCategoryProductStore } from "../store/useProductStore";
import { type Product as ProductType } from "../api/products";
import { useEffect } from "react";

export const Category = ({ id, name }: { id: number; name: string }) => {
  const fetchProducts = useCategoryProductStore((state) => state.fetchProducts);
  const products = useCategoryProductStore<ProductType[]>(
    (state) => state.productsByCategoryId[id]
  );

  useEffect(() => {
    fetchProducts(id);
  }, []);

  return (
    <div className="flex flex-col items-center p-2 secondary rounded-lg w-full max-w-md">
      {/* i want to have a overlay with category image and title */}
      <div className="relative w-full h-20">
        <img
          src={Unknown}
          alt="Category"
          className="w-full h-full  object-cover rounded-lg"
        />
        {/* make it transparent */}
        <div className="absolute inset-0 backdrop-blur-[2px] flex items-center justify-center rounded-lg">
          <h2 className="text-white text-2xl font-bold">{name}</h2>
        </div>
      </div>
      {/* List of products in this category */}

      <ul className="list bg-base-100 rounded-box shadow-md w-full">
        {products
          ? products.map((product) => (
              <Product key={product.id} product={product} />
            ))
          : null}
      </ul>
    </div>
  );
};
