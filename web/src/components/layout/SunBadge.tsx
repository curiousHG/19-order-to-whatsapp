import { cn } from "@/lib/utils";

interface SunBadgeProps {
  className?: string;
}

// The "19" sun disc lifted from the shop seal. The full seal (see Loader)
// is unreadable below ~120px, so small placements get the disc alone;
// pass `className` to override the default h-11 w-11 sizing.
export function SunBadge({ className }: SunBadgeProps) {
  return (
    <img
      src="/mark.webp"
      alt=""
      aria-hidden="true"
      width={512}
      height={512}
      className={cn("h-11 w-11 shrink-0 object-contain", className)}
    />
  );
}
