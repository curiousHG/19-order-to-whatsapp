import { useOrderStore } from "../store/useOrderStore";
import { FaWhatsapp } from "react-icons/fa6";
import icon from "../assets/19_favicon.ico";

export const OrderCart = () => {
  const { order, removeProduct } = useOrderStore();
  const orderItems = Object.values(order);

  if (orderItems.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center px-6 text-center pt-70">
        <h2 className="mb-2 text-xl font-semibold text-gray-800">
          Your Cart is Empty 🛒
        </h2>
        <p className="text-sm text-gray-500">
          Add items from the store to proceed.
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col items-center px-4 pb-24 pt-24">
      <div className="mx-auto w-full max-w-2xl">
        <h2 className="mb-4 text-center text-2xl font-bold text-gray-800">
          Your Cart
        </h2>

        <ul className="flex flex-col gap-4">
          {orderItems.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between rounded-lg bg-white p-3 shadow-sm hover:shadow-md transition"
            >
              {/* Product Info */}
              <div className="flex items-center gap-3 flex-1">
                <img
                  src={
                    item.image
                      ? `https://res.cloudinary.com/dbwetv45x/${item.image}`
                      : icon
                  }
                  alt={item.name}
                  className="h-12 w-12 rounded-lg object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {item.name}
                  </p>
                  <span className="text-xs text-gray-500 line-clamp-1">
                    {item.description}
                  </span>
                </div>
              </div>

              {/* Quantity */}
              <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                {item.quantity} {item.unit}
              </span>

              {/* Remove */}
              <button
                className="ml-3 flex h-8 w-8 items-center justify-center rounded-full bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 transition"
                onClick={() => removeProduct(item.id)}
                title="Remove"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Confirm Button */}
      <button
        className="fixed bottom-6 w-[61%] max-w-sm rounded-full bg-green-500 py-3 text-md font-semibold text-white shadow-lg hover:bg-green-600 transition"
        onClick={() => alert("Order confirmed!")}
      >
        <div className="flex items-center justify-center gap-1">
          <FaWhatsapp className="text-2xl" />
          Send Order to WhatsApp
        </div>
      </button>
    </div>
  );
};
