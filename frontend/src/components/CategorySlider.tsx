import { useEffect } from "react";

import { useCategoryStore } from "../store/useCategoryStore";

export const CategorySlider = () => {
  const getCategories = useCategoryStore((state) => state.fetchCategories);
  const categories = useCategoryStore((state) => state.categories);

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="w-full flex justify-center items-center mb-2">
      <div className="flex space-x-4 overflow-x-auto p-1 ">
        {/* temporary array of categories */}
      
        {categories.map((category) => (
          <button key={category.id} className="btn">
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};
