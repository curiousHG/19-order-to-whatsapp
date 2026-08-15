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

// Persisted "last used" customer details, so a returning shopper doesn't
// have to retype name / address / phone / email on every order. Pulled from
// (and pushed back into) `localStorage["customer"]` automatically.
interface CustomerState {
  name: string
  address: string
  phone: string
  email: string
  // Null for guests; stops a different signed-in person inheriting these.
  owner: string | null
  setCustomer: (c: Partial<Omit<CustomerState, 'setCustomer'>>) => void
  resetCustomer: (owner?: string | null) => void
}

const EMPTY = { name: '', address: '', phone: '', email: '' }

export const useCustomerStore = create<CustomerState>()(
  persist(
    (set) => ({
      ...EMPTY,
      owner: null,
      setCustomer: (c) => set((s) => ({ ...s, ...c })),
      resetCustomer: (owner = null) => set((s) => ({ ...s, ...EMPTY, owner })),
    }),
    { name: 'customer' }
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

// Stepper increment for the +/− buttons. Fine-grained units (gm, mL) step
// by 50 because nobody buys 1 gm of anything; everything else steps by 1.
export function stepForUnit(unit: string): number {
  return unit === 'gm' || unit === 'mL' ? 50 : 1
}

interface OrderHeader {
  name: string
  address: string
}

// Phone and email are recorded server-side (Customer row) and shown in the
// admin, but deliberately omitted from the WhatsApp message — the shop owner
// already has the chat thread for follow-up and doesn't want the contact
// details echoed back into a forwardable text.
export function buildWhatsAppUrl(header: OrderHeader, items: CartItem[]): string {
  const headerLines = [
    '*Order from 19no. Khari Baoli*',
    '',
    `*Name:* ${header.name}`,
    `*Address:* ${header.address}`,
  ]

  const message = [
    ...headerLines,
    '',
    `*Items (${items.length}):*`,
    formatOrderTable(items),
    '',
    'Thank you!',
  ].join('\n')
  return `https://wa.me/919811572962?text=${encodeURIComponent(message)}`
}

// WhatsApp doesn't render markdown tables. Triple-backtick code blocks use a
// monospace font and preserve whitespace, so we hand-pad columns to align.
// Names longer than NAME_SOFT_CAP wrap onto a second indented line; the
// quantity then sits on that second line, keeping every qty column-aligned.
function formatOrderTable(items: CartItem[]): string {
  if (items.length === 0) return ''

  const NAME_SOFT_CAP = 22 // wrap names longer than this onto a second line

  const rows = items.map((item) => ({
    lines: wrapName(item.name, NAME_SOFT_CAP),
    qty: `${item.quantity} ${item.unit}`,
  }))

  // Column-width = the widest "display width" across all rendered lines.
  // First line of a wrapped row has no indent; continuation lines get +2 chars.
  const displayWidths = rows.flatMap((r) =>
    r.lines.length === 1
      ? [r.lines[0].length]
      : [r.lines[0].length, r.lines[1].length + 2]
  )
  const nameWidth = Math.max(4, ...displayWidths)
  const qtyWidth = Math.max(3, ...rows.map((r) => r.qty.length))

  const header = `${'Item'.padEnd(nameWidth)}  ${'Qty'.padStart(qtyWidth)}`
  const divider = '─'.repeat(nameWidth + 2 + qtyWidth)

  const out: string[] = [header, divider]
  for (const r of rows) {
    if (r.lines.length === 1) {
      out.push(`${r.lines[0].padEnd(nameWidth)}  ${r.qty.padStart(qtyWidth)}`)
    } else {
      // First line is the name only (no qty); qty rides on the continuation.
      out.push(r.lines[0])
      const cont = '  ' + r.lines[1]
      out.push(`${cont.padEnd(nameWidth)}  ${r.qty.padStart(qtyWidth)}`)
    }
  }

  return '```\n' + out.join('\n') + '\n```'
}

// Wrap a name onto at most 2 lines, breaking at the last space ≤ maxWidth.
// If no space fits, hard-break. Returns 1 or 2 trimmed lines.
function wrapName(name: string, maxWidth: number): string[] {
  const trimmed = name.trim()
  if (trimmed.length <= maxWidth) return [trimmed]

  const breakAt = trimmed.lastIndexOf(' ', maxWidth)
  if (breakAt <= 0) {
    // No space to break on — hard split
    return [trimmed.slice(0, maxWidth), trimmed.slice(maxWidth)]
  }
  return [trimmed.slice(0, breakAt).trim(), trimmed.slice(breakAt + 1).trim()]
}
