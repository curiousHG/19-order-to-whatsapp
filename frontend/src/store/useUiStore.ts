import { create } from 'zustand';

type ActivePage = 'store' | 'cart';

interface UiStore {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
}

export const useUiStore = create<UiStore>((set) => ({
  activePage: 'store',
  setActivePage: (page) => set({ activePage: page }),
}));
