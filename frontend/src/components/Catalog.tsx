import React, { Suspense } from "react";
import { useEffect } from "react";
import { useCategoryStore } from "../store/useCategoryStore";
const Category = React.lazy(() => import("./Category"));


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
          {/* <GroupedTableVirtuoso
            style={{ height: "100vh",  background: 'whitesmoke', width: '100%' }}
            groupCounts={categories.map((category) => category.product_count)}
            groupContent={(index) => (
              <td colSpan={1} className="flex w-full items-center justify-center bg-base-200 p-2">
                <CategoryHeader category={categories[index]} />
              </td>
            )}
            itemContent={(index, categoryIdx) => {
              const category = categories[categoryIdx];
              console.log("Category in view:", category.name);
              return (
                <td>i d k</td>
              );
            }}
          /> */}
          {categories.map((category) => (
            <div
              key={category.id}
              ref={(el) => {
                categoryRefs.current[category.id] = el;
              }}
              className="flex w-full scroll-mt-44 items-center justify-center"
            >
              <Suspense
                fallback={
                  <div className="flex w-full items-center justify-center">
                    Loading category...
                  </div>
                }
              >
                <Category key={category.id} category={category} />
              </Suspense>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
