import { useState } from "react";
import { ShoppingBasket } from "lucide-react";
import { cn, thumbUrl } from "@/lib/utils";

interface ProductThumbProps {
  src: string | null | undefined;
  alt: string;
  className?: string; // overrides the default size; default is h-12 w-12
  px?: number; // rendered size in CSS px, used to size the Cloudinary fetch
}

// Small square product image with a fallback basket icon. Used by the product
// list, cart drawer, and checkout summary so the styling stays consistent.
// Tracks image-load failures so a broken Cloudinary URL falls back gracefully
// to the icon instead of showing the browser's broken-image placeholder.
//
// Requests a 2x Cloudinary thumbnail rather than the original upload, and
// lazy-loads, so a category of 70+ items doesn't fetch 70 full-size photos.
export function ProductThumb({ src, alt, className, px = 48 }: ProductThumbProps) {
  const [failed, setFailed] = useState(false);
  const resolved = thumbUrl(src, px * 2);
  const showImage = Boolean(resolved) && !failed;
  return (
    <div
      className={cn(
        "shrink-0 h-12 w-12 rounded-lg overflow-hidden bg-green-100 flex items-center justify-center",
        className
      )}
    >
      {showImage ? (
        <img
          src={resolved}
          alt={alt}
          loading="lazy"
          decoding="async"
          width={px}
          height={px}
          className="w-full h-full object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <ShoppingBasket className="h-5 w-5 text-green-500" />
      )}
    </div>
  );
}
