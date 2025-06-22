import React from "react";
import { Product } from "./Product";

export const Category = () => {
  return (
    <div className="flex flex-col items-center p-4 secondary shadow-md rounded-lg w-full max-w-md">
      <div>
        <img
          src="https://via.placeholder.com/150"
          alt="Category"
          className="w-full h-32 object-cover rounded-t-lg"
        />
        <h2 className="text-xl font-bold mt-2">Category Title</h2>
      </div>

      <ul className="list bg-base-100 rounded-box shadow-md w-full">
        {[1, 2, 3].map((product) => (
          <Product key={product} />
        ))}
      </ul>
    </div>
  );
};
