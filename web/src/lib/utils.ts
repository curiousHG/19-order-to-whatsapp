import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Cloudinary serves the original upload unless you ask for a transformation,
// so a 4MB photo would land in a 48px thumbnail slot. Inject a resize into
// the delivery URL. Non-Cloudinary URLs (local dev media) pass through.
export function thumbUrl(src: string | null | undefined, px: number): string | undefined {
  if (!src) return undefined
  const marker = "/image/upload/"
  const at = src.indexOf(marker)
  if (at === -1) return src
  const head = src.slice(0, at + marker.length)
  const tail = src.slice(at + marker.length)
  return `${head}f_auto,q_auto,c_fill,w_${px},h_${px}/${tail}`
}
