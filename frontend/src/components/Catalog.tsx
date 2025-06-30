import { useEffect } from "react";
import { useCategoryStore } from "../store/useCategoryStore";
import { Category } from "./Category";

export const Catalog = ({ categoryRefs }: { categoryRefs: React.MutableRefObject<Record<number, HTMLDivElement | null>> }) => {
  const getCategories = useCategoryStore((state) => state.fetchCategories);
  const categories = useCategoryStore((state) => state.categories);

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <div className="flex flex-col flex-1 items-center p-1">
      <div className="h-full w-full flex-1 flex items-center justify-center">
        <div className="flex flex-col gap-4 items-center w-full max-w-2xl">
          {categories.map((category) => (
            <div
              key={category.id}
              ref={(el) => (categoryRefs.current[category.id] = el)}
              className="w-full scroll-mt-44"
            >
            <Category key={category.id} id={category.id} name={category.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
