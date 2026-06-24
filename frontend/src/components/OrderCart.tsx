import { useOrderStore } from "../store/useOrderStore";
import { FaWhatsapp } from "react-icons/fa6";
import { useState } from "react";
import icon from "../assets/19_favicon.ico";
import { createOrder } from "../api/order";

export const OrderCart = () => {
  const { order, removeProduct } = useOrderStore();
  const orderItems = Object.values(order);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  if (orderItems.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center px-6 pt-70 text-center">
        <h2 className="mb-2 text-xl font-semibold text-gray-800">
          Your Cart is Empty 🛒
        </h2>
        <p className="text-sm text-gray-500">
          Add items from the store to proceed.
        </p>
      </div>
    );
  }

  const formPathNameFromOrder = (): string => {
    let pathname =
      "http://wa.me/919811572962?text=Hello!%0AI%20want%20to%20order%20the%20following%20items%20from%20your%20store%0A%0A";

    pathname += `Name:%20${encodeURIComponent(name)}%0A`;
    pathname += `Address:%20${encodeURIComponent(address)}%0A%0A`;

    for (const key in order) {
      const item = order[key];
      pathname += `${encodeURIComponent(item.name)}%20${item.quantity}${encodeURIComponent(item.unit)}%0A`;
    }

    pathname += "%0A%0AThank%20you!";
    return pathname;
  };

  const handleSendOrder = async () => {
    if (!name || !address) {
      alert("Please enter your name and address.");
      return;
    }

    setLoading(true);
    try {
      const orderPayload = {
      customer: {
        name,
        address
      },
      products: orderItems.map((item) => ({
        product_id: item.id, // matches your serializer's expectation
        quantity: item.quantity,
        unit: item.unit
      }))
    };
      await createOrder(orderPayload);

      alert("Order successfully placed!");
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Something went wrong");
    } finally {
      setLoading(false);
      const formPathName = formPathNameFromOrder();
      // Open WhatsApp
      window.location.href = formPathName;
    }
  };

  return (
    <div className="flex h-full flex-col items-center px-4 pt-24 pb-24">
      <div className="mx-auto w-full max-w-2xl">
        <h2 className="mb-4 text-center text-2xl font-bold text-gray-800">
          Your Cart
        </h2>

        {/* User Info Fields */}
        <div className="mb-4 flex flex-col gap-2">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input w-full rounded-md border px-3 py-2"
          />
          <input
            type="text"
            placeholder="Your Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="input w-full rounded-md border px-3 py-2"
          />
        </div>

        {/* Order Items */}
        <ul className="flex flex-col gap-4">
          {orderItems.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between rounded-lg bg-white p-3 shadow-sm transition hover:shadow-md"
            >
              <div className="flex flex-1 items-center gap-3">
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
                  <span className="line-clamp-1 text-xs text-gray-500">
                    {item.description}
                  </span>
                </div>
              </div>

              <span className="text-sm font-medium whitespace-nowrap text-gray-700">
                {item.quantity} {item.unit}
              </span>

              <button
                className="ml-3 flex h-8 w-8 items-center justify-center rounded-full bg-red-50 text-red-500 transition hover:bg-red-100 hover:text-red-600"
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

      {/* Confirm Button */}
      <button
        disabled={loading}
        className="text-md fixed bottom-6 w-[90%] max-w-sm rounded-full bg-green-500 py-3 font-semibold text-white shadow-lg transition hover:bg-green-600"
        onClick={handleSendOrder}
      >
        <div className="flex items-center justify-center gap-2">
          {loading ? (
            "Placing Order..."
          ) : (
            <>
              <FaWhatsapp className="text-2xl" />
              Send Order to WhatsApp
            </>
          )}
        </div>
      </button>
    </div>
  );
};
