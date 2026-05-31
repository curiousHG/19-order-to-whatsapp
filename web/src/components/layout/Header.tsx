import { Link } from "react-router-dom";
import { Search, ShoppingCart } from "lucide-react";

interface HeaderProps {
  onSearchClick?: () => void;
  onCartClick?: () => void;
  cartCount?: number;
}

export function Header({ onSearchClick, onCartClick, cartCount = 0 }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-green-600 shadow-md">
      <div className="h-14 flex items-center justify-between gap-3 pl-3 pr-2">
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
        <div className="flex items-center gap-0.5 shrink-0">
          {onSearchClick && (
            <button
              onClick={onSearchClick}
              aria-label="Search products"
              className="h-10 w-10 rounded-full flex items-center justify-center text-white hover:bg-white/10 active:bg-white/20 transition-colors touch-manipulation"
            >
              <Search className="h-5 w-5" />
            </button>
          )}
          {onCartClick && (
            <button
              onClick={onCartClick}
              aria-label={`Open cart${cartCount > 0 ? ` (${cartCount} ${cartCount === 1 ? "item" : "items"})` : ""}`}
              className="relative h-10 w-10 rounded-full flex items-center justify-center text-white hover:bg-white/10 active:bg-white/20 transition-colors touch-manipulation"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 h-4 min-w-4 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center px-1 leading-none">
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

function SunBadge() {
  const cx = 40;
  const cy = 40;
  const rayInner = 28;
  const rayOuter = 34;
  const rays = Array.from({ length: 16 }, (_, i) => {
    const angle = (i * Math.PI * 2) / 16 - Math.PI / 2;
    return {
      x1: cx + Math.cos(angle) * rayInner,
      y1: cy + Math.sin(angle) * rayInner,
      x2: cx + Math.cos(angle) * rayOuter,
      y2: cy + Math.sin(angle) * rayOuter,
    };
  });
  return (
    <svg viewBox="0 0 80 80" className="h-11 w-11 shrink-0" aria-hidden="true">
      <g stroke="#fde68a" strokeWidth="2.5" strokeLinecap="round">
        {rays.map((r, i) => (
          <line key={i} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2} />
        ))}
      </g>
      <circle cx={cx} cy={cy} r={25} fill="#fbbf24" />
      <text
        x={cx}
        y={49}
        textAnchor="middle"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight={800}
        fontSize={28}
        fill="#15803d"
      >
        19
      </text>
    </svg>
  );
}
