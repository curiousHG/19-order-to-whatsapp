import { create } from "zustand";
import { getProducts, type Product } from "../api/products";


interface CategoryProductStore {
    productsByCategoryId: Record<number, Product[]>;
    fetchProducts: (categoryId: number) => Promise<void>;
}

const useCategoryProductStore = create<CategoryProductStore>((set, get) => ({
    productsByCategoryId: {},

    fetchProducts: async (categoryId: number) => {
        // Check if products for this category are already loaded
        const { productsByCategoryId } = get();
        if (productsByCategoryId[categoryId]) {
            return; // Products already loaded for this category
        }
        try {
            const products = await getProducts(categoryId); 
            // console.log(`Fetched products for category ${categoryId}:`, products);
            set((state) => ({
                productsByCategoryId: {
                    ...state.productsByCategoryId,
                    [categoryId]: products,
                },
            }));
        } catch (error) {
            console.error(`Failed to fetch products for category ${categoryId}:`, error);
        }
    },
}));

export { useCategoryProductStore, type CategoryProductStore };
