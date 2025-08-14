export interface CustomerPayload {
  name: string;
  address: string;
}

export interface OrderItemPayload {
  product_id: number; // product ID
  quantity: number;
  unit: string; // e.g., "kg", "pcs"
}

export interface OrderPayload {
  customer: CustomerPayload;
  products: OrderItemPayload[];
}

export const createCustomer = async (data: CustomerPayload) => {
  const res = await fetch("/store/customer", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to create customer");
  }

  return res.json(); // { message: "customer created", id: ... }
};

export const createOrder = async (data: OrderPayload) => {
  const res = await fetch("/store/order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to create order");
  }

  return res.json(); // { message: "order created" }
};