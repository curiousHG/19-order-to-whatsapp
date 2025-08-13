import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import defaultCategory from "../assets/defaultCategory.jpeg";
import { type Category as CategoryType} from "../api/categories";

type CategoryHeaderProps = {
  category: CategoryType
  onVisible: () => void;
};

const CategoryHeader: React.FC<CategoryHeaderProps> = React.memo(({ category, onVisible }) => {
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      onVisible();
    }
  }, [inView, onVisible]);

  const categoryImage = category.image
    ? `${category.image}?w=1000&h=800&fit=crop`
    : defaultCategory;

  return (
    <div
      ref={ref}
      className="relative w-full h-24 flex items-center justify-center rounded-xl overflow-hidden shadow-md bg-white"
    >
      <img
        src={categoryImage}
        alt={category.name}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover rounded-t-lg"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/5 rounded-t-lg">
        <h2 className="text-xl font-semibold text-white">
          {category.name}
        </h2>
      </div>
    </div>
  );
});

export default CategoryHeader;
