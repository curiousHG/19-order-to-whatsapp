'use client'

import { useRouter } from 'next/navigation'
import { ShoppingCart, Trash2, MessageCircle } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useCartStore } from '@/lib/cart-store'

interface CartDrawerProps {
  open: boolean
  onClose: () => void
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const router = useRouter()
  const { items, removeItem, clearCart } = useCartStore()

  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent className="flex flex-col w-full sm:max-w-md p-0">
        <SheetHeader className="px-6 pt-6 pb-4 border-b">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-green-600" />
            Your Order
            {items.length > 0 && (
              <span className="text-sm font-normal text-muted-foreground">
                ({items.length} {items.length === 1 ? 'item' : 'items'})
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-2 text-muted-foreground px-6">
            <ShoppingCart className="h-10 w-10 text-muted-foreground/30" />
            <p className="text-sm">No items added yet</p>
            <p className="text-xs text-center">
              Browse the categories and add items to your order
            </p>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 px-6">
              <div className="space-y-3 py-4">
                {items.map((item) => (
                  <div
                    key={item.productId}
                    className="flex items-center justify-between gap-3"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium leading-tight">
                        {item.name}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {item.quantity} {item.unit}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="text-muted-foreground hover:text-destructive transition-colors shrink-0"
                      aria-label={`Remove ${item.name}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="px-6 pb-6 pt-4 border-t flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={clearCart}
                className="gap-1 text-xs"
              >
                <Trash2 className="h-3 w-3" />
                Clear
              </Button>
              <Button
                className="flex-1 bg-green-600 hover:bg-green-700 text-white gap-2"
                onClick={() => {
                  onClose()
                  router.push('/checkout')
                }}
              >
                <MessageCircle className="h-4 w-4" />
                Place Order
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
