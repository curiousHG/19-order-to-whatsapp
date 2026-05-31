import { Minus, Plus } from "lucide-react";
import { stepForUnit } from "@/lib/cart-store";
import { cn } from "@/lib/utils";

interface QtyButtonsProps {
  value: number;
  unit: string;
  onChange: (next: number) => void;
  className?: string;
}

// Two long, low-height bar buttons sharing the cart item card's full width
// (50/50 split). No input field — the cart row already shows the quantity.
// Render this as a child of an `overflow-hidden` card so the buttons clip
// neatly into the card's rounded corners.
export function QtyButtons({ value, unit, onChange, className }: QtyButtonsProps) {
  const step = stepForUnit(unit);
  const canDecrement = value > 0;

  function adjust(delta: number) {
    const next = Math.max(0, value + delta);
    onChange(Math.round(next * 100) / 100);
  }

  const btn =
    "flex-1 h-7 flex items-center justify-center text-green-700 font-bold hover:bg-green-50 active:bg-green-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors touch-manipulation";

  return (
    <div className={cn("flex border-t border-green-100", className)}>
      <button
        type="button"
        onClick={() => adjust(-step)}
        disabled={!canDecrement}
        aria-label="Decrease quantity"
        className={btn}
      >
        <Minus className="h-4 w-4" strokeWidth={3} />
      </button>
      <div className="w-px bg-green-100" aria-hidden="true" />
      <button
        type="button"
        onClick={() => adjust(step)}
        aria-label="Increase quantity"
        className={btn}
      >
        <Plus className="h-4 w-4" strokeWidth={3} />
      </button>
    </div>
  );
}
