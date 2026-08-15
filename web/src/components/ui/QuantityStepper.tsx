import { useEffect, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { stepForUnit } from "@/lib/cart-store";
import { cn } from "@/lib/utils";

interface QuantityStepperProps {
  value: number;
  unit: string;
  onChange: (next: number) => void;
  className?: string;
}

// Numeric input with embedded − and + buttons. Step size depends on the
// unit (gm/mL → 50, others → 1) so the buttons match shopkeeper expectations.
// Used by ProductRow and the cart drawer; the same component, same behaviour,
// in both places.
export function QuantityStepper({ value, unit, onChange, className }: QuantityStepperProps) {
  // Local string draft so the input doesn't snap a trailing "." away while
  // the user is mid-type. Synced back to the controlled `value` prop on
  // every external change (e.g. cycling units elsewhere).
  const [draft, setDraft] = useState(value > 0 ? String(value) : "");
  useEffect(() => {
    setDraft(value > 0 ? String(value) : "");
  }, [value]);

  const step = stepForUnit(unit);
  const canDecrement = value > 0;

  function adjust(delta: number) {
    const next = Math.max(0, value + delta);
    onChange(Math.round(next * 100) / 100);
  }

  return (
    <div
      className={cn(
        "flex items-center h-8 rounded-md border border-input bg-white overflow-hidden focus-within:ring-2 focus-within:ring-ring/30",
        className
      )}
    >
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
        value={draft}
        placeholder="0"
        onChange={(e) => {
          setDraft(e.target.value);
          const num = parseFloat(e.target.value);
          onChange(isNaN(num) || num < 0 ? 0 : num);
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
  );
}
