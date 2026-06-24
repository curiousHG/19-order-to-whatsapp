import { create } from "zustand"
import type { Product } from "../api/products";

interface OrderProduct extends Product {
    quantity: number;
    unit: string;
}

interface OrderStore {
    order: Record<number, OrderProduct>;
    updateOrder: (product: Product, quantity: number, unit: string) => void;
    removeProduct: (productId: number) => void;
}

export const useOrderStore = create<OrderStore>((set, get) => ({
    order: {},
    updateOrder: (product, quantity, unit) => {
        if (quantity <= 0) return; // prevent invalid order
        set((state) => ({
            order: {
                ...state.order,
                [product.id]: { ...product, quantity, unit },
            },
        }));
    },
    removeProduct: (productId) => {
        const current = get().order;
        const { [productId]: _, ...rest } = current;
        set({ order: rest });
    },

}))