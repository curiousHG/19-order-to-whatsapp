import React from "react";
import dal from "../assets/dal.jpeg";
import { useOrderStore } from "../store/useOrderStore";
import { cloudinaryImageBaseUrl } from "../constants";
import { type Product as ProductType } from "../api/products";
import { useProductQuantityDrawerStore } from "../store/useProductQuantityDrawerStore";

type ProductProps = {
  product: ProductType;
};

const Product = React.memo(({ product }: ProductProps) => {
  const { order } = useOrderStore();
  const openDrawer = useProductQuantityDrawerStore((s) => s.openDrawer);

  const productImage = product.image
    ? `${cloudinaryImageBaseUrl}/${product.image}?w=150&h=150&fit=crop`
    : dal;

  return (
    <li className="flex items-center justify-between gap-3 p-3 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow duration-200">
      <img
        src={productImage}
        alt={product.name}
        loading="lazy"
        decoding="async"
        className="size-15 rounded"
      />
      <div className="flex flex-1 flex-col gap-1">
        <div>{product.name}</div>
        <div className="text-xs font-semibold uppercase opacity-60">
          {product.description}
        </div>
      </div>
      <button className="btn btn-sm" onClick={() => openDrawer(product)}>
        {order[product.id] ? "Edit" : "Add to Cart"}
      </button>
    </li>
  );
});

export default Product;
