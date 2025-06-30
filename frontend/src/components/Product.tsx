import dal from "../assets/dal.jpeg";
import { useState } from "react";
import { type Product as ProductType } from "../api/products";
import { useOrderStore } from "../store/useOrderStore";

export const Product = ({ product }: { product: ProductType }) => {
  // on tapping kbd change its value to Kg

  const { order, updateOrder } = useOrderStore();
  const [quantity, setQuantity] = useState<number|undefined>(order[product.id]?.quantity || undefined);
  const productImage = product.image? `https://res.cloudinary.com/dbwetv45x/${product.image}`: dal

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (value > 0) {
      setQuantity(value);
      updateOrder(product, value, product.unit);
    }
  };

  return (
    <li className="list-row justify-between items-center p-2 flex gap-3">
      <div>
        <img className="size-15 rounded-box" src={productImage} alt ={product.name} />
      </div>
      <div className="flex-1 flex flex-col gap-1">
        <div>{product.name}</div>
        <div className="text-xs uppercase font-semibold opacity-60">
          {product.description}
        </div>
      </div>
      <label className="input m-0 p-1 w-1/2">
        <input
          type="text"
          placeholder="Enter Quantity"
          className="input"
          onChange={handleQuantityChange}
          value={quantity}
        />
        <kbd className="kbd kbd-sm">{product.unit}</kbd>
      </label>
    </li>
  );
};
