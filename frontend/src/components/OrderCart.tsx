import { useOrderStore } from "../store/useOrderStore";
import { FaWhatsapp } from "react-icons/fa6";
import icon from "../assets/19_favicon.ico";

export const OrderCart = () => {
  const { order, removeProduct } = useOrderStore();

  const handleConfirm = () => {
    // TODO: Handle order submission
    alert("Order confirmed!");
  };

  const orderItems = Object.values(order);

  if (orderItems.length === 0) {
    return (
      <div className="flex h-full w-full flex-1 flex-col items-center justify-center p-4 text-center">
        <h2 className="mb-2 text-xl font-semibold">Your Cart is Empty 🛒</h2>
        <p className="text-sm opacity-70">
          Add items from the store to proceed.
        </p>
      </div>
    );
  }

  // const productImage = product.image? `https://res.cloudinary.com/dbwetv45x/${product.image}`: dal

  return (
    <div className="flex h-full flex-1 flex-col items-center p-4">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-3">
        <h2 className="mb-4 text-center text-xl font-bold">Your Cart</h2>

        <ul className="flex flex-col gap-3">
          {orderItems.map((item) => (
            <li
              key={item.id}
              className="bg-base-200 flex items-center justify-between rounded-lg p-2"
            >
              <div className="flex w-full items-center justify-between pr-6">
                <div className="flex gap-2">
                  <img
                    src={
                      item.image
                        ? `https://res.cloudinary.com/dbwetv45x/${item.image}`
                        : icon
                    }
                    alt={item.name}
                    className="h-10 w-10 rounded-lg"
                  />
                  <div className="flex flex-col">
                    <p className="font-semibold">{item.name}</p>
                    <span className="text-xs opacity-70">
                      {item.description}
                    </span>
                  </div>
                </div>

                <span className="font-medium">
                  {item.quantity} {item.unit}
                </span>
              </div>
              <button
                className="btn btn-xs btn-outline btn-error rounded-4xl"
                onClick={() => removeProduct(item.id)}
              >
                {/* minus icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 12H4"
                  />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <button
        className="btn btn-success fixed bottom-20 mx-auto mt-6 w-full max-w-sm text-lg"
        onClick={handleConfirm}
      >
        <FaWhatsapp className="text-2xl" />
        Send Order to Whatsapp
      </button>
    </div>
  );
};
