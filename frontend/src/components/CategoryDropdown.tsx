import { useEffect, useState, type RefObject } from "react";
import { useCatalogStore } from "../store/useCatalogStore";
import type { VirtuosoHandle } from "react-virtuoso";
import defaultCategory from "../assets/defaultCategory.jpeg";

export const CategoryDropdown = ({
  virtuosoRef
}: {
  virtuosoRef: RefObject<VirtuosoHandle | null>;
}) => {
  const { fetchCategories, categories, categoryIndexMap } = useCatalogStore();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const scrollToCategory = (categoryId: number) => {
    const index = categoryIndexMap[categoryId];
    if (index !== undefined && virtuosoRef.current) {
      virtuosoRef.current.scrollToIndex({
        index,
        align: "start",
        behavior: "smooth"
      });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="p-2 rounded hover:bg-gray-100 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
        </svg>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm">
          <div className="w-11/12 max-w-lg rounded-lg bg-white shadow-lg relative flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="p-4 flex justify-between items-center">
              <h2 className="text-lg font-bold">Categories</h2>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setIsOpen(false)}
              >
                ✕
              </button>
            </div>

            {/* Scrollable Grid */}
            <div className="p-4 overflow-y-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {categories.map((cat) => {
                  const categoryImage = cat.image
                    ? `${cat.image}?w=1000&h=800&fit=crop`
                    : defaultCategory;

                  return (
                    <div
                      key={cat.id}
                      className="cursor-pointer group rounded-lg overflow-hidden shadow hover:shadow-md transition relative"
                      onClick={() => scrollToCategory(cat.id)}
                    >
                      {/* Image with overlay text */}
                      <div className="relative">
                        <img
                          src={categoryImage}
                          alt={cat.name}
                          className="w-full h-20 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                          <span className="text-white text-sm font-semibold text-center px-2">
                            {cat.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
