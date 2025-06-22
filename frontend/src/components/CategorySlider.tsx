import { useState, useEffect } from "react";
import { getCategories } from "../api/categories";

export const CategorySlider = () => {
  const [apiData, setApiData] = useState<any[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        const data = response ? response : [];
        setApiData(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);
  return (
    <div className="w-full flex justify-center items-center mb-2">
      <div className="flex space-x-4 overflow-x-auto p-1 ">
        {/* temporary array of categories */}
        {Array.from({ length: 10 }, (_, i) => ({
          id: i + 1,
          name: `Category ${i + 1}`,
        })).map((category) => (
          <button key={category.id} className="btn btn-primary">
            {category.name}
          </button>
        ))}

        {/* Uncomment below to use fetched categories */}
        {/* {apiData.length > 0 ? (
          apiData.map((category: any) => (
            <button key={category.id} className="btn">
              {category.name}
            </button>
          ))
        ) : (
          <span>Loading...</span>
        )} */}
      </div>
    </div>
  );
};
