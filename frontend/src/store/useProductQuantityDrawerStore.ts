import { create } from "zustand";
import { type Product as ProductType } from "../api/products";

type DrawerState = {
  open: boolean;
  product: ProductType | null;
  openDrawer: (product: ProductType) => void;
  closeDrawer: () => void;
};

export const useProductQuantityDrawerStore = create<DrawerState>((set) => ({
  open: false,
  product: null,
  openDrawer: (product) => set({ open: true, product }),
  closeDrawer: () => set({ open: false, product: null }),
}));