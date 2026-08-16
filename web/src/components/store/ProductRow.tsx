import { useEffect, useState } from "react";
import type { Product } from "@/lib/types";
import { useCartStore, getUnitsFor, canonicalizeUnit } from "@/lib/cart-store";
import { ProductThumb } from "@/components/ProductThumb";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { cn } from "@/lib/utils";

interface ProductRowProps {
  product: Product;
}

// What we store in the cart (and ultimately what shows on WhatsApp + the
// admin's order snapshot). Description gives extra disambiguation like
// "Atta (19no)" or "Hing 50g pack", which is useful when several products
// share a base name.
function displayName(p: Product): string {
  return [p.brand, p.name, (p.description ?? "").trim()]
    .filter(Boolean)
    .join(" ");
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

  const [unit, setUnit] = useState<string>(initialUnit);
  const inCart = Boolean(cartItem);
  const canCycleUnit = units.length > 1;
  const qty = cartItem?.quantity ?? 0;

  function sync(quantity: number, u: string) {
    setItem({
      productId: product.id,
      name: displayName(product),
      image: product.image,
      quantity,
      unit: u,
    });
  }

  // If the cart had a non-canonical unit ("Kg"), rewrite it to canonical on
  // first render so the cart drawer and WhatsApp message agree with the row.
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
    // Reset qty on unit change — "2 KG" doesn't equal "2 gm", so re-entering
    // the quantity in the new unit avoids surprises.
    sync(0, next);
  }

  return (
    <div
      className={cn(
        "row-defer flex items-center gap-3 px-4 py-3 border-b border-border transition-colors",
        inCart ? "bg-green-50" : "bg-white hover:bg-gray-50/60"
      )}
    >
      <ProductThumb src={product.image} alt={product.name} />

      <div className="flex-1 min-w-0">
        <p className="font-medium text-base leading-tight">{product.name}</p>
        {(product.brand || product.description) && (
          <p className="text-sm text-muted-foreground truncate">
            {product.brand && (
              <span
                className={cn(
                  "font-semibold",
                  product.brand === "19no" && "text-amber-700"
                )}
              >
                {product.brand}
              </span>
            )}
            {product.brand && product.description && " · "}
            {product.description}
          </p>
        )}
      </div>

      <div className="flex items-center gap-1 shrink-0">
        <QuantityStepper
          value={qty}
          unit={unit}
          onChange={(n) => sync(n, unit)}
        />
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
            "h-8 px-2 ml-1 rounded-md text-sm font-bold flex items-center justify-center min-w-12 touch-manipulation transition-all",
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
