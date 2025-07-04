import { Product } from "./Product";
import defaultCategory from "../assets/defaultCategory.jpeg";
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
    <div className="secondary flex w-full max-w-md flex-col items-center rounded-lg p-2">
      {/* i want to have a overlay with category image and title */}
      <div className="relative h-20 w-full">
        <img
          src={defaultCategory}
          alt="Category"
          className="h-full w-full rounded-t-lg object-cover"
        />
        {/* make it transparent */}
        <div className="absolute inset-0 flex items-center justify-center rounded-lg backdrop-blur-[0.25px]">
          <h2 className="text-2xl font-bold text-white">{name}</h2>
        </div>
      </div>
      {/* List of products in this category */}

      <ul className="list bg-base-100 rounded-box w-full shadow-md">
        {products
          ? products.map((product, idx) => (
              <Product key={idx} product={product} />
            ))
          : null}
      </ul>
    </div>
  );
};
