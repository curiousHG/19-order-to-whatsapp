'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ShoppingBasket } from 'lucide-react'
import type { Product } from '@/lib/types'
import { useCartStore, getUnitsFor } from '@/lib/cart-store'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

interface ProductRowProps {
  product: Product
}

export function ProductRow({ product }: ProductRowProps) {
  const { items, setItem } = useCartStore()
  const cartItem = items.find((i) => i.productId === product.id)
  const units = getUnitsFor(product.unit)

  const [qty, setQty] = useState<string>(cartItem ? String(cartItem.quantity) : '')
  const [unit, setUnit] = useState<string>(cartItem?.unit ?? units[0])
  const inCart = Boolean(cartItem)

  function sync(qtyStr: string, u: string) {
    const num = parseFloat(qtyStr)
    setItem({
      productId: product.id,
      name: product.name,
      quantity: isNaN(num) || num <= 0 ? 0 : num,
      unit: u,
    })
  }

  return (
    <div
      className={cn(
        'flex items-center gap-3 px-4 py-3 border-b border-border transition-colors',
        inCart ? 'bg-green-50' : 'bg-white hover:bg-gray-50/60'
      )}
    >
      {/* Image */}
      <div className="shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-green-100 flex items-center justify-center">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            width={48}
            height={48}
            className="object-cover w-full h-full"
          />
        ) : (
          <ShoppingBasket className="h-5 w-5 text-green-500" />
        )}
      </div>

      {/* Name + price */}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm leading-tight">{product.name}</p>
        {product.description && (
          <p className="text-xs text-muted-foreground truncate">{product.description}</p>
        )}
      </div>

      {/* Quantity + unit */}
      <div className="flex items-center gap-1.5 shrink-0">
        <Input
          type="number"
          min="0"
          step="0.5"
          value={qty}
          placeholder="0"
          onChange={(e) => {
            setQty(e.target.value)
            sync(e.target.value, unit)
          }}
          className="w-20 h-8 text-sm text-center"
        />
        {units.length > 1 ? (
          <Select
            value={unit}
            onValueChange={(u) => {
              if (!u) return
              setUnit(u)
              sync(qty, u)
            }}
          >
            <SelectTrigger className="w-16 h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {units.map((u) => (
                <SelectItem key={u} value={u}>
                  {u}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <div className="w-16 h-8 flex items-center justify-center text-xs font-medium text-muted-foreground border border-border rounded-md bg-muted px-2">
            {units[0]}
          </div>
        )}
      </div>
    </div>
  )
}
