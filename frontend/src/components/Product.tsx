import dal from "../assets/dal.jpeg";
import { useState } from "react";
import { type Product as ProductType } from "../api/products";
import { useOrderStore } from "../store/useOrderStore";
import { ProductQuantityDrawer } from "./ProductQuantityDrawer";
import { cloudinaryImageBaseUrl } from "../constants";

const Product = ({ product }: { product: ProductType }) => {
  // on tapping kbd change its value to Kg

  const [drawerOpen, setDrawerOpen] = useState(false);

  const { order } = useOrderStore();
  const productImage = product.image
    ? `${cloudinaryImageBaseUrl}/${product.image}`
    : dal;

  return (
    <li className="list-row flex items-center justify-between gap-3 p-2">
      <div>
        <img
          loading="lazy"
          className="rounded-box size-15"
          src={productImage}
          alt={product.name}
        />
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <div>{product.name}</div>
        <div className="text-xs font-semibold uppercase opacity-60">
          {product.description}
        </div>
      </div>
      <button
          className="btn btn-sm"
          onClick={() => setDrawerOpen(true)}
        >
          {order[product.id] ? "Edit" : "Add to Cart"}
        </button>
        <ProductQuantityDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          product={product}
        />

    </li>
  );
};

export default Product
