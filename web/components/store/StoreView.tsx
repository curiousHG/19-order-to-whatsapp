'use client'

import { useState } from 'react'
import { ShoppingCart } from 'lucide-react'
import type { Category } from '@/lib/types'
import { useCartStore } from '@/lib/cart-store'
import { Header } from '@/components/layout/Header'
import { CartDrawer } from '@/components/cart/CartDrawer'
import { ProductRow } from '@/components/store/ProductRow'
import { cn } from '@/lib/utils'

interface StoreViewProps {
  categories: Category[]
}

export function StoreView({ categories }: StoreViewProps) {
  const [activeId, setActiveId] = useState<number | null>(null)
  const [cartOpen, setCartOpen] = useState(false)
  const items = useCartStore((s) => s.items)

  const active =
    categories.find((c) => c.id === activeId) ?? categories[0] ?? null
  const visibleProducts = active?.products.filter((p) => p.available) ?? []

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      {/* Mobile: horizontal category chips */}
      <div className="md:hidden flex gap-2 overflow-x-auto px-4 py-2.5 bg-white border-b border-border no-scrollbar shrink-0">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveId(cat.id)}
            className={cn(
              'shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-colors',
              active?.id === cat.id
                ? 'bg-amber-500 text-white'
                : 'bg-gray-100 text-foreground hover:bg-gray-200'
            )}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Desktop + mobile layout */}
      <div className="flex flex-1">
        {/* Desktop sidebar */}
        <aside className="hidden md:flex flex-col w-52 shrink-0 sticky top-14 self-start h-[calc(100vh-3.5rem)] overflow-y-auto border-r border-border bg-white">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveId(cat.id)}
              className={cn(
                'text-left px-4 py-3 text-sm font-medium border-b border-border transition-colors',
                active?.id === cat.id
                  ? 'bg-amber-500 text-white'
                  : 'text-foreground hover:bg-green-50'
              )}
            >
              {cat.name}
            </button>
          ))}
        </aside>

        {/* Product list */}
        <main className="flex-1 min-w-0">
          {active && (
            <>
              <div className="sticky top-14 z-10 px-4 py-2.5 bg-white border-b border-border">
                <h2 className="font-semibold text-sm">{active.name}</h2>
                <p className="text-xs text-muted-foreground">
                  {visibleProducts.length}{' '}
                  {visibleProducts.length === 1 ? 'item' : 'items'}
                </p>
              </div>

              {visibleProducts.length === 0 ? (
                <p className="px-4 py-10 text-sm text-muted-foreground text-center">
                  No items available in this category
                </p>
              ) : (
                visibleProducts.map((product) => (
                  <ProductRow key={product.id} product={product} />
                ))
              )}
            </>
          )}
        </main>
      </div>

      {/* Floating cart button — bottom right */}
      {items.length > 0 && (
        <button
          onClick={() => setCartOpen(true)}
          aria-label="Open cart"
          className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-green-600 text-white shadow-lg hover:bg-green-700 active:scale-95 transition-all flex items-center justify-center"
        >
          <ShoppingCart className="h-6 w-6" />
          <span className="absolute -top-1 -right-1 h-5 min-w-5 rounded-full bg-amber-500 text-white text-xs font-bold flex items-center justify-center px-1">
            {items.length}
          </span>
        </button>
      )}

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  )
}
