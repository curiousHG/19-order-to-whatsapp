import {create } from 'zustand';
import { getCategories, type Category } from '../api/categories';

interface CategoryStore {
  categories: Category[];
  fetchCategories: () => Promise<void>;
}

export const useCategoryStore = create<CategoryStore>((set, get) => ({
  categories: [],
  fetchCategories: async () => {
    // only fetch categories if they are not already loaded
    const categories = get().categories;
    if (categories.length === 0) {
      const data = await getCategories();
      set({ categories: data });
    }
  },
}));