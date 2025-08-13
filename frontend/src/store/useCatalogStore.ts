import {create} from "zustand"
import { getCategories, type Category } from "../api/categories"
import { getProducts, type Product } from "../api/products";

interface CatalogStore {
    categories: Category[];
    productsByCategoryId: Record<number, Product[]>;
    loadingCategories: boolean;
    loadingProducts: Record<number, boolean>;
    fetchCategories: () => Promise<void>;
    fetchProducts: (categoryId: number) => Promise<void>;
}

export const useCatelogStore = create<CatalogStore>((set, get) => ({
    categories: [],
    productsByCategoryId: {},
    loadingCategories: false,
    loadingProducts: {},

    fetchCategories: async () => {
        set({loadingCategories: true});
        const categories = await getCategories();
        set({categories, loadingCategories: false});

    },

    fetchProducts: async (categoryId: number) => {
        const { productsByCategoryId, loadingProducts } = get();
        if (productsByCategoryId[categoryId] || loadingProducts[categoryId]) {
            return; // Products already loaded or loading
        }
        set((state) => ({
            loadingProducts: {
                ...state.loadingProducts,
                [categoryId]: true,
            }
        }));

        const products = await getProducts(categoryId);
        set((state) => ({
            productsByCategoryId: {
                ...state.productsByCategoryId,
                [categoryId]: products,
            },
            loadingProducts: {
                ...state.loadingProducts,
                [categoryId]: false,

            }
        }));
    }
}));