import { useOrderStore } from "../store/useOrderStore";

export const OrderCart = () => {
  const { order, removeProduct } = useOrderStore();

  const handleConfirm = () => {
    // TODO: Handle order submission
    alert("Order confirmed!");
  };

  const orderItems = Object.values(order);

  if (orderItems.length === 0) {
    return (
      <div className=" flex flex-1 flex-col justify-center items-center p-4 text-center h-full w-full">
        <h2 className="text-xl font-semibold mb-2">Your Cart is Empty 🛒</h2>
        <p className="text-sm opacity-70">
          Add items from the store to proceed.
        </p>
      </div>
    );
  }

  // const productImage = product.image? `https://res.cloudinary.com/dbwetv45x/${product.image}`: dal

  return (
    <div className="p-4 flex flex-col flex-1 min-h-screen ">
      <div className="flex flex-col gap-3 max-w-2xl mx-auto w-full">
        <h2 className="text-xl font-bold mb-4 text-center">Your Cart</h2>

        <ul className="flex flex-col gap-3">
          {orderItems.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center bg-base-200 p-3 rounded-lg"
            >
              <div className="flex items-center w-full justify-between pr-6">
                <div className="flex gap-2">
                  <img src={ item.image ? `https://res.cloudinary.com/dbwetv45x/${item.image}` : ""} alt={item.name} className="w-10 h-10 rounded-lg"/>
                  <div className="flex flex-col ">
                    <p className="font-medium">{item.name}</p>
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
                className="btn btn-xs btn-outline btn-error"
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
        className="btn btn-primary mt-6 w-full fixed bottom-20 left-2 max-w-sm mx-auto"
        onClick={handleConfirm}
      >
        Confirm Order
      </button>
    </div>
  );
};
