import { useEffect } from "react";
import { useCategoryStore } from "../store/useCategoryStore";
import { Category } from "./Category";

export const Catalog = ({
  categoryRefs
}: {
  categoryRefs: React.MutableRefObject<Record<number, HTMLDivElement | null>>;
}) => {
  const getCategories = useCategoryStore((state) => state.fetchCategories);
  const categories = useCategoryStore((state) => state.categories);

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <div className="flex flex-1 flex-col items-center p-1">
      <div className="flex h-full w-full flex-1 items-center justify-center">
        <div className="flex w-full max-w-2xl flex-1 flex-col items-center gap-4">
          {categories.map((category) => (
            <div
              key={category.id}
              ref={(el) => {
                categoryRefs.current[category.id] = el;
              }}
              className="flex w-full scroll-mt-44 items-center justify-center"
            >
              <Category
                key={category.id}
                id={category.id}
                name={category.name}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
