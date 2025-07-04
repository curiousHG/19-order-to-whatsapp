import { type Product as ProductType } from "../api/products";
import { useOrderStore } from "../store/useOrderStore";
import { useState } from "react";

export const ProductQuantityDrawer = ({
  open,
  onClose,
  product,
}: {
  open: boolean;
  onClose: () => void;
  product: ProductType;
}) => {
  const { order, updateOrder, removeProduct } = useOrderStore();
  const [quantity, setQuantity] = useState<number | undefined>(
    order[product.id]?.quantity || undefined
  );

  const handleSubmit = () => {
    if (!quantity || quantity <= 0) {
      removeProduct(product.id);
    } else {
      updateOrder(product, quantity, product.unit);
    }
    onClose();
  };

  return (
    <div
      className={`fixed bottom-0 left-0 w-full transition-transform duration-300 z-50 ${
        open ? "translate-y-0" : "translate-y-full"
      } bg-white border-t border-gray-300 p-4 shadow-lg rounded-t-2xl`}
    >
      <h3 className="text-lg font-bold">{product.name}</h3>
      <p className="text-sm text-gray-500">{product.description}</p>
      <div className="mt-4 flex items-center gap-1">
        <input
          type="number"
          placeholder="Enter quantity"
          value={quantity || ""}
          onChange={(e) => {
            const val = Number(e.target.value);
            setQuantity(Number.isNaN(val) ? undefined : val);
          }}
          className="input input-md"
        />
        <kbd className="kbd kbd-sm">{product.unit}</kbd>
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <button className="btn btn-ghost" onClick={onClose}>
          Cancel
        </button>
        <button className="btn btn-primary" onClick={handleSubmit}>
          {order[product.id] ? "Update" : "Add"}
        </button>
      </div>
    </div>
  );
};
