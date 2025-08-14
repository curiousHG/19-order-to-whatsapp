import { useOrderStore } from "../store/useOrderStore";
import { useEffect, useState } from "react";
import { useProductQuantityDrawerStore } from "../store/useProductQuantityDrawerStore";

export const ProductQuantityDrawer = ({
  open,
  onClose
}: {
  open: boolean;
  onClose: () => void;
}) => {

  const { product } = useProductQuantityDrawerStore();
  const { order, updateOrder, removeProduct } = useOrderStore();
  const [quantity, setQuantity] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (product) {
      setQuantity(order[product.id]?.quantity);
    } else {
      setQuantity(undefined);
    }
  }, [product, order]);

  const handleSubmit = () => {
    if (!quantity || quantity <= 0) {
      if (product) {
        removeProduct(product.id);
      }
    } else {
      if (product) {
        updateOrder(product, quantity, product.unit);
      }
    }
    setQuantity(undefined); // Reset quantity after submission
    onClose();
  };

  return (
    <div
      className={`fixed bottom-0 left-0 z-50 w-full transition-transform duration-300 ${
        open ? "translate-y-0" : "translate-y-full"
      } rounded-t-2xl border-t border-gray-300 bg-white p-4 shadow-lg`}
    >
      <h3 className="text-lg font-bold">{product?.name}</h3>
      <p className="text-sm text-gray-500">{product?.description}</p>
      <div className="mt-4 flex items-center justify-around">
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
        <kbd className="kbd kbd-md">{product?.unit}</kbd>
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <button className="btn btn-ghost" onClick={onClose}>
          Cancel
        </button>
        <button className="btn btn-primary" onClick={handleSubmit}>
          {product ? (order[product.id] ? "Update" : "Add") : null}
        </button>
      </div>
    </div>
  );
};
