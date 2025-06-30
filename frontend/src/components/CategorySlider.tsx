import { useEffect } from "react";

import { useCategoryStore } from "../store/useCategoryStore";

export const CategorySlider = ({
  categoryRefs,
}: {
  categoryRefs: React.MutableRefObject<Record<number, HTMLDivElement | null>>;
}) => {
  const getCategories = useCategoryStore((state) => state.fetchCategories);
  const categories = useCategoryStore((state) => state.categories);

  useEffect(() => {
    getCategories();
  }, []);

  const scrollToCategory = (categoryId: number) => {
    const ref = categoryRefs.current[categoryId];
    if (!ref) return;

    const headerEl = document.getElementById("fixed-header");
    const headerHeight = headerEl?.offsetHeight ?? 0;

    const topOfElement = ref.getBoundingClientRect().top + window.pageYOffset;
    const scrollToPosition = topOfElement - headerHeight;

    window.scrollTo({ top: scrollToPosition, behavior: "smooth" });

    // ref.scrollIntoView({ behavior: "smooth", block: "start"});
  };

  return (
    <div className="w-full flex justify-center items-center mb-2">
      <div className="flex space-x-4 overflow-x-auto p-1 ">
        {/* temporary array of categories */}

        {categories.map((category) => (
          <button
            key={category.id}
            className="btn"
            onClick={() => scrollToCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};
