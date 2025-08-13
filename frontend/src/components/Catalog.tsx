import React, {useEffect} from "react";
import { useCatelogStore } from "../store/useCatalogStore";
// import { CategoryHeader } from "./CategoryHeader";
import Category from "./Category";
import Product from "./Product";

export const Catalog = ({
  categoryRefs
}: {
  categoryRefs: React.MutableRefObject<Record<number, HTMLDivElement | null>>;
}) => {

  const {categories, productsByCategoryId, fetchCategories, fetchProducts} = useCatelogStore();

  useEffect(() => {
    fetchCategories();
  }, []);

  // const groupCounts = categories.map((cat) =>
  //   productsByCategoryId[cat.id]?.length || cat.product_count || 0
  // );

  return (
    <div className="flex flex-1 flex-col items-center p-1">
      <div className="flex h-full w-full flex-1 items-center justify-center">
        <div className="flex w-full max-w-2xl items-center gap-4 flex-col">
          {categories.map((category) => (
            <div
              key={category.id}
              ref={(el) => {
                if (el) {
                  categoryRefs.current[category.id] = el;
                }
              }}
              className="flex w-full flex-col items-center gap-2"
            >
              <Category category={category} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
