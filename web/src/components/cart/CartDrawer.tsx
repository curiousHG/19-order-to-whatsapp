import { useNavigate } from "react-router-dom";
import { MessageCircle, ShoppingBasket, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { QtyButtons } from "@/components/ui/QtyButtons";
import { ProductThumb } from "@/components/ProductThumb";
import { useCartStore } from "@/lib/cart-store";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const navigate = useNavigate();
  const { items, setItem, removeItem, clearCart } = useCartStore();
  const itemCount = items.length;

  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent
        showCloseButton={false}
        className="flex flex-col w-full sm:max-w-md p-0 bg-amber-50 overflow-hidden"
      >
        {/* Brand-tinted header band */}
        <SheetHeader className="px-5 pt-5 pb-4 bg-green-600 text-white shadow-sm border-b border-green-700 relative">
          <SheetTitle className="flex items-center gap-3 text-white pr-10">
            <span className="flex flex-col leading-none">
              <span className="font-serif font-bold text-lg tracking-wide">
                Your Cart
              </span>
              <span className="text-amber-200 text-[10px] uppercase tracking-[0.25em] mt-1">
                {itemCount === 0
                  ? "Empty"
                  : `${itemCount} ${itemCount === 1 ? "item" : "items"}`}
              </span>
            </span>
          </SheetTitle>
          <button
            onClick={onClose}
            aria-label="Close cart"
            className="absolute top-4 right-3 h-8 w-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 active:bg-white/20 transition-colors touch-manipulation"
          >
            <X className="h-4 w-4" />
          </button>
        </SheetHeader>

        {itemCount === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-8 text-center">
            <ShoppingBasket className="h-14 w-14 text-green-600/40" strokeWidth={1.5} />
            <p className="text-sm font-medium text-foreground">
              Your cart is empty
            </p>
            <p className="text-xs text-muted-foreground max-w-[20rem]">
              Browse the catalog and tap the{" "}
              <span className="font-semibold">+</span> next to any product to
              add it here.
            </p>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 min-h-0">
              <ul className="px-4 py-4 space-y-2">
                {items.map((item) => (
                  <li
                    key={item.productId}
                    className="bg-white border border-green-100 rounded-xl shadow-sm overflow-hidden"
                  >
                    <div className="flex items-start gap-3 p-3">
                      <ProductThumb
                        src={item.image}
                        alt={item.name}
                        className="h-10 w-10"
                      />
                      <span className="flex-1 min-w-0 flex flex-col gap-0.5">
                        <span className="text-sm font-medium leading-snug line-clamp-2">
                          {item.name}
                        </span>
                        <span className="text-sm font-bold text-green-700 tabular-nums">
                          {item.quantity}
                          <span className="text-[11px] uppercase tracking-wider text-green-700/70 ml-0.5">
                            {item.unit}
                          </span>
                        </span>
                      </span>
                      <button
                        onClick={() => removeItem(item.productId)}
                        aria-label={`Remove ${item.name}`}
                        className="shrink-0 h-8 w-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-red-50 active:bg-red-100 transition-colors touch-manipulation"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    {/* Bottom: full-width − / + bar */}
                    <QtyButtons
                      value={item.quantity}
                      unit={item.unit}
                      onChange={(n) =>
                        setItem({
                          productId: item.productId,
                          name: item.name,
                          image: item.image,
                          quantity: n,
                          unit: item.unit,
                        })
                      }
                    />
                  </li>
                ))}
              </ul>
            </ScrollArea>

            <div className="px-4 pb-4 pt-3 border-t border-amber-200 bg-amber-50 space-y-2">
              <Button
                className="w-full h-11 bg-green-600 hover:bg-green-700 text-white gap-2 text-sm font-semibold shadow-sm"
                onClick={() => {
                  onClose();
                  navigate("/checkout");
                }}
              >
                <MessageCircle className="h-4 w-4" />
                Checkout
              </Button>
              <button
                onClick={clearCart}
                className="w-full text-xs text-muted-foreground hover:text-destructive transition-colors py-1 touch-manipulation"
              >
                Clear cart
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
