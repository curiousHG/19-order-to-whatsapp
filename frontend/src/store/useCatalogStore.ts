import { create } from "zustand"
import { getCategories, type Category } from "../api/categories"
import { getProducts, type Product } from "../api/products";

interface CatalogStore {
    categoryIndexMap: Record<number, number>;
    setCategoryIndexMap: (map: Record<number, number>) => void;

    categories: Category[];
    loadingCategories: boolean;
    fetchCategories: () => Promise<void>;
    
    productsByCategoryId: Record<number, Product[]>;
    loadingProducts: Record<number, boolean>;
    fetchProducts: (categoryId: number) => Promise<void>;

    searchQuery: string;
    filteredProducts: Product[];
    setSearchQuery: (query: string) => void;

        
}

export const useCatalogStore = create<CatalogStore>((set, get) => ({

    categoryIndexMap: {},
    setCategoryIndexMap: (map) => set({ categoryIndexMap: map }),
    
    categories: [],
    loadingCategories: false,
    fetchCategories: async () => {
        
        const { categories } = get();
        if (categories.length > 0) return; // already loaded
        
        set({ loadingCategories: true });
        const fetchedCategories = await getCategories();
        set({ categories: fetchedCategories, loadingCategories: false });
        
    },

    productsByCategoryId: {},
    loadingProducts: {},
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
    },

    searchQuery: "",
    filteredProducts: [],
    setSearchQuery: (query) => {
        const { productsByCategoryId, categories } = get();

        const allProducts = categories.flatMap(
        (cat) => productsByCategoryId[cat.id] || []
        );

        // Basic fuzzy-ish match: match in name or description
        const filtered = allProducts.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description?.toLowerCase().includes(query.toLowerCase())
        );

        set({ searchQuery: query, filteredProducts: filtered });
    },
    
}));