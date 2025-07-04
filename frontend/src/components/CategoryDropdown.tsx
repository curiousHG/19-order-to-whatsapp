import { useEffect,useState } from "react";
import Dialog from "@mui/material/Dialog";
import { useCategoryStore } from "../store/useCategoryStore";
// import store from "../assets/store.svg";

export const CategoryDropdown = ({
  categoryRefs
}: {
  categoryRefs: React.MutableRefObject<Record<number, HTMLDivElement | null>>;
}) => {
  const getCategories = useCategoryStore((state) => state.fetchCategories);
  const categories = useCategoryStore((state) => state.categories);
  const [isOpen, setIsOpen] = useState(false);

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

    window.scrollTo({ top: scrollToPosition, behavior: "instant" });
  };

  return (
    <>
      <button onClick={() => setIsOpen((prev) => !prev)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h7"
          />
        </svg>
        {/* <img src={store} alt="Store" className="h-5 w-5" /> */}
        Menu
      </button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen((prev) => !prev)}
        slots={{
          backdrop: ({ className, ...props }) => (
            <div
              className={`fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity ${className}`}
              {...props}
            />
          )
        }}
      >
        <div className="rounded-box rounded-4xl bg-base-100 mt-1 ml-1 space-y-5 p-5 px-10 pr-12">
          <h1 className="text-2xl text-gray-800">Categories</h1>
          <ul className="list space-y-2">
            {categories.map((category) => (
              <li className="bg-base-200 block w-full rounded-md px-5 py-3 text-left text-gray-700 transition-colors hover:text-blue-600">
                <a
                  key={category.id}
                  className=""
                  onClick={() => {
                    scrollToCategory(category.id);
                    setIsOpen((prev) => !prev);
                  }}
                >
                  {category.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Dialog>
    </>
  );
};
