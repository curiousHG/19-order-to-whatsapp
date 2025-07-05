// import { Product } from "./Product";
import React, { Suspense } from "react";
const Product = React.lazy(() => import("./Product"));
import defaultCategory from "../assets/defaultCategory.jpeg";
import { useCategoryProductStore } from "../store/useProductStore";
import { type Product as ProductType } from "../api/products";
import { useEffect } from "react";
import { type Category as CategoryType } from "../api/categories";
import { useInView } from "react-intersection-observer";
import { Virtuoso } from 'react-virtuoso';

const Category = ({ category }: { category: CategoryType }) => {
  const { ref, inView } = useInView({ triggerOnce: true });
  const fetchProducts = useCategoryProductStore((state) => state.fetchProducts);
  const products = useCategoryProductStore<ProductType[]>(
    (state) => state.productsByCategoryId[category.id]
  );

  useEffect(() => {
    // console.log("Category in view:", category.name, inView);
    if(inView)fetchProducts(category.id);
  }, [inView]);


  const categoryImage = category.image ? category.image : defaultCategory;
  return (
    <div ref={ref} className="flex w-full max-w-md flex-col items-center rounded-lg p-2">
      {/* i want to have a overlay with category image and title */}
      <div className="relative h-20 w-full">
        <img
          loading="lazy"
          className="h-full w-full rounded-t-lg object-cover"
          src={categoryImage}
          alt="Category"
        />
        {/* make it transparent */}
        <div className="absolute inset-0 flex items-center justify-center rounded-lg">
          <h2 className="text-4xl font-semibold text-amber-50">
            {category.name}
          </h2>
        </div>
      </div>
      {/* List of products in this category */}

      <ul className="list bg-base-100 rounded-box w-full shadow-md">
        <div style={{ height: '70dvh', overflow: 'hidden', boxSizing: 'border-box', resize: 'both' }}>
          <Virtuoso
            style={{ height: '100%' }}
            data={products}
            itemContent={(index, product) => (
              <Product key={index} product={product} />
            )}
          />
          </div>
      </ul>
    </div>
  );
};

export default Category;