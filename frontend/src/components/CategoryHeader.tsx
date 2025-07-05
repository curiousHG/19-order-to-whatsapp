// import { Product } from "./Product";
import defaultCategory from "../assets/defaultCategory.jpeg";
import { type Category as CategoryType } from "../api/categories";

export const CategoryHeader = ({ category }: { category: CategoryType }) => {


  const categoryImage = category.image ? category.image : defaultCategory;
  return (
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

  );
};
