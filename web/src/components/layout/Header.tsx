import { Link } from "react-router-dom";
import { Search, ShoppingCart } from "lucide-react";
import { SunBadge } from "@/components/layout/SunBadge";

interface HeaderProps {
  onSearchClick?: () => void;
  onCartClick?: () => void;
  cartCount?: number;
}

export function Header({ onSearchClick, onCartClick, cartCount = 0 }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-green-600 shadow-md">
      <div className="h-16 flex items-center justify-between gap-3 pl-3 pr-2">
        <Link to="/" className="flex items-center gap-2.5 min-w-0">
          <SunBadge />
          <span className="flex flex-col leading-none min-w-0">
            <span className="text-white text-xl font-serif font-bold tracking-wide truncate">
              Khari Baoli
            </span>
            <span className="text-amber-200 text-[10px] uppercase tracking-[0.25em] mt-0.5 truncate">
              Chandni Chowk, Delhi 6
            </span>
          </span>
        </Link>
        <div className="flex items-center gap-1.5 shrink-0">
          {onSearchClick && (
            <button
              onClick={onSearchClick}
              aria-label="Search products"
              className="h-12 w-12 rounded-full flex items-center justify-center text-white hover:bg-white/10 active:bg-white/20 transition-colors touch-manipulation"
            >
              <Search className="h-7 w-7" strokeWidth={2.25} />
            </button>
          )}
          {onCartClick && (
            <button
              onClick={onCartClick}
              aria-label={`Open cart${cartCount > 0 ? ` (${cartCount} ${cartCount === 1 ? "item" : "items"})` : ""}`}
              className="relative h-12 w-12 rounded-full bg-amber-400 text-green-950 shadow-sm flex items-center justify-center hover:bg-amber-300 active:scale-95 transition-all touch-manipulation"
            >
              <ShoppingCart className="h-7 w-7" strokeWidth={2.25} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 min-w-5 rounded-full bg-green-700 text-white text-[11px] font-bold flex items-center justify-center px-1 leading-none border-2 border-green-600">
                  {cartCount}
                </span>
              )}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
