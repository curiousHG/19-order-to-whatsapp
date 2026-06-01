// Full-screen loader: the brand sun badge with rays pulsing outward
// and the background glowing between amber-50 and amber-200.
// Used by HomePage while categories are loading.
export function Loader() {
  const cx = 40;
  const cy = 40;
  const rayInner = 28;
  const rayOuter = 36;
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
    <div className="min-h-screen flex items-center justify-center animate-loader-bg-glow">
      <div className="text-center">
        <svg
          viewBox="0 0 80 80"
          className="h-56 w-56 mx-auto drop-shadow-[0_0_40px_rgba(251,191,36,0.55)]"
          aria-hidden="true"
        >
          <g
            className="animate-sun-rays-pulse"
            stroke="#f59e0b"
            strokeWidth="3"
            strokeLinecap="round"
          >
            {rays.map((r, i) => (
              <line key={i} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2} />
            ))}
          </g>
          <circle
            className="animate-sun-disc-breathe"
            cx={cx}
            cy={cy}
            r={22}
            fill="#fbbf24"
          />
          <text
            x={cx}
            y={cy}
            textAnchor="middle"
            dominantBaseline="central"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight={900}
            fontSize={34}
            letterSpacing={-1.5}
            fill="#15803d"
          >
            19
          </text>
        </svg>
        <p className="mt-6 text-sm font-medium text-amber-900/70 tracking-wider uppercase">
          19 Khari Baoli
        </p>
      </div>
    </div>
  );
}
