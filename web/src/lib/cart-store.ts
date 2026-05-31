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

// Unit options keyed by the canonical base unit
export const UNIT_OPTIONS: Record<string, string[]> = {
  KG: ['KG', 'gm'],
  LTR: ['LTR', 'mL'],
  gm: ['gm', 'KG'],
  Pc: ['Pc'],
}

// Map the various capitalisations / spellings that come back from the DB
// onto their canonical key in UNIT_OPTIONS.
const UNIT_ALIASES: Record<string, string> = {
  kg: 'KG', KG: 'KG', Kg: 'KG', kG: 'KG', kilogram: 'KG', Kilogram: 'KG',
  ltr: 'LTR', LTR: 'LTR', Ltr: 'LTR', l: 'LTR', L: 'LTR', liter: 'LTR', Liter: 'LTR',
  gm: 'gm', GM: 'gm', Gm: 'gm', g: 'gm', gram: 'gm', Gram: 'gm',
  pc: 'Pc', Pc: 'Pc', PC: 'Pc', pcs: 'Pc', Pcs: 'Pc', piece: 'Pc', Piece: 'Pc',
  ml: 'LTR', mL: 'LTR', ML: 'LTR',  // mL alone → treat as LTR base
}

export function getUnitsFor(baseUnit: string): string[] {
  const canonical = UNIT_ALIASES[baseUnit] ?? baseUnit
  return UNIT_OPTIONS[canonical] ?? [baseUnit]
}

// Map a raw unit string ("Kg", "kg", "KG", "L", "GM", …) to its canonical form
// ("KG", "LTR", "gm", "Pc"). Returns the raw string if no alias matches.
export function canonicalizeUnit(raw: string): string {
  return UNIT_ALIASES[raw] ?? raw
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
