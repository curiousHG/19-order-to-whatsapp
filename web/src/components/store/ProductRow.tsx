import { useEffect, useState } from "react";
import { Minus, Plus, ShoppingBasket } from "lucide-react";
import type { Product } from "@/lib/types";
import { useCartStore, getUnitsFor, canonicalizeUnit } from "@/lib/cart-store";
import { cn } from "@/lib/utils";

interface ProductRowProps {
  product: Product;
}

function stepForUnit(unit: string): number {
  return unit === "gm" || unit === "mL" ? 50 : 1;
}

export function ProductRow({ product }: ProductRowProps) {
  const { items, setItem } = useCartStore();
  const cartItem = items.find((i) => i.productId === product.id);
  const units = getUnitsFor(product.unit);

  const cartUnitNormalised = cartItem?.unit
    ? canonicalizeUnit(cartItem.unit)
    : undefined;
  const initialUnit =
    cartUnitNormalised && units.includes(cartUnitNormalised)
      ? cartUnitNormalised
      : units[0];

  const [qty, setQty] = useState<string>(
    cartItem ? String(cartItem.quantity) : ""
  );
  const [unit, setUnit] = useState<string>(initialUnit);
  const [imgFailed, setImgFailed] = useState(false);
  const inCart = Boolean(cartItem);
  const showImage = Boolean(product.image) && !imgFailed;
  const canCycleUnit = units.length > 1;
  const step = stepForUnit(unit);
  const numericQty = parseFloat(qty) || 0;
  const canDecrement = numericQty > 0;

  function sync(qtyStr: string, u: string) {
    const num = parseFloat(qtyStr);
    setItem({
      productId: product.id,
      name: product.name,
      quantity: isNaN(num) || num <= 0 ? 0 : num,
      unit: u,
    });
  }

  useEffect(() => {
    if (cartItem && cartItem.unit !== initialUnit) {
      sync(qty, initialUnit);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function cycleUnit() {
    if (!canCycleUnit) return;
    const idx = units.indexOf(unit);
    const next = units[(idx + 1) % units.length];
    setUnit(next);
    sync(qty, next);
  }

  function adjust(delta: number) {
    const next = Math.max(0, numericQty + delta);
    const nextStr = String(Math.round(next * 100) / 100);
    setQty(nextStr);
    sync(nextStr, unit);
  }

  return (
    <div
      className={cn(
        "flex items-center gap-3 px-4 py-3 border-b border-border transition-colors",
        inCart ? "bg-green-50" : "bg-white hover:bg-gray-50/60"
      )}
    >
      <div className="shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-green-100 flex items-center justify-center">
        {showImage ? (
          <img
            src={product.image as string}
            alt={product.name}
            width={48}
            height={48}
            className="object-cover w-full h-full"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <ShoppingBasket className="h-5 w-5 text-green-500" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm leading-tight">{product.name}</p>
        {product.description && (
          <p className="text-xs text-muted-foreground truncate">
            {product.description}
          </p>
        )}
      </div>

      <div className="flex items-center gap-1 shrink-0">
        <div className="flex items-center h-8 rounded-md border border-input bg-white overflow-hidden focus-within:ring-2 focus-within:ring-ring/30">
          <button
            type="button"
            onClick={() => adjust(-step)}
            disabled={!canDecrement}
            aria-label="Decrease quantity"
            className="h-full w-7 flex items-center justify-center text-gray-600 hover:text-green-700 hover:bg-green-50 active:bg-green-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors touch-manipulation"
          >
            <Minus className="h-4 w-4" strokeWidth={3} />
          </button>
          <input
            type="number"
            inputMode="decimal"
            min="0"
            step={step}
            value={qty}
            placeholder="0"
            onChange={(e) => {
              setQty(e.target.value);
              sync(e.target.value, unit);
            }}
            className="w-10 h-full text-sm text-center bg-transparent outline-none border-0 touch-manipulation [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          <button
            type="button"
            onClick={() => adjust(step)}
            aria-label="Increase quantity"
            className="h-full w-7 flex items-center justify-center text-gray-600 hover:text-green-700 hover:bg-green-50 active:bg-green-100 transition-colors touch-manipulation"
          >
            <Plus className="h-4 w-4" strokeWidth={3} />
          </button>
        </div>

        <button
          type="button"
          onClick={cycleUnit}
          disabled={!canCycleUnit}
          aria-label={
            canCycleUnit ? `Unit: ${unit}, tap to change` : `Unit: ${unit}`
          }
          title={
            canCycleUnit
              ? `Tap to switch unit (${units.join(" / ")})`
              : undefined
          }
          className={cn(
            "h-8 px-2 ml-1 rounded-md text-xs font-bold flex items-center justify-center min-w-12 touch-manipulation transition-all",
            canCycleUnit
              ? "bg-green-600 text-white border-2 border-green-700 hover:bg-green-700 active:scale-95 shadow-sm cursor-pointer"
              : "bg-gray-100 text-muted-foreground border border-border cursor-not-allowed"
          )}
        >
          {unit}
        </button>
      </div>
    </div>
  );
}
