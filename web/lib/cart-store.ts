import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem } from './types'

interface CartState {
  items: CartItem[]
  setItem: (item: CartItem) => void
  removeItem: (productId: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      setItem: (item) =>
        set((state) => {
          if (item.quantity <= 0) {
            return { items: state.items.filter((i) => i.productId !== item.productId) }
          }
          const idx = state.items.findIndex((i) => i.productId === item.productId)
          if (idx >= 0) {
            const updated = [...state.items]
            updated[idx] = item
            return { items: updated }
          }
          return { items: [...state.items, item] }
        }),

      removeItem: (productId) =>
        set((state) => ({ items: state.items.filter((i) => i.productId !== productId) })),

      clearCart: () => set({ items: [] }),
    }),
    { name: 'cart' }
  )
)

// Unit options keyed by the product's base unit
export const UNIT_OPTIONS: Record<string, string[]> = {
  KG: ['KG', 'gm'],
  LTR: ['LTR', 'mL'],
  gm: ['gm', 'KG'],
  Pc: ['Pc'],
}

export function getUnitsFor(baseUnit: string): string[] {
  return UNIT_OPTIONS[baseUnit] ?? [baseUnit]
}

export function buildWhatsAppUrl(
  name: string,
  address: string,
  items: CartItem[]
): string {
  const lines = items.map((item) => `${item.name} ${item.quantity} ${item.unit}`)
  const message = [
    'Hello!',
    'I want to order the following items from your store',
    '',
    `Name: ${name}`,
    `Address: ${address}`,
    '',
    ...lines,
    '',
    'Thank you!',
  ].join('\n')
  return `https://wa.me/919811572962?text=${encodeURIComponent(message)}`
}
