import { cn } from "@/lib/utils";

interface SunBadgeProps {
  className?: string;
}

// Raying sun with "19" in the centre. Pure SVG so it scales crisply at
// any size; pass `className` to override the default h-11 w-11 sizing.
export function SunBadge({ className }: SunBadgeProps) {
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
    <svg
      viewBox="0 0 80 80"
      className={cn("h-11 w-11 shrink-0", className)}
      aria-hidden="true"
    >
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
