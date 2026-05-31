import { useState } from "react";
import { ShoppingBasket } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductThumbProps {
  src: string | null | undefined;
  alt: string;
  className?: string; // overrides the default size; default is h-12 w-12
}

// Small square product image with a fallback basket icon. Used by the product
// list, cart drawer, and checkout summary so the styling stays consistent.
// Tracks image-load failures so a broken Cloudinary URL falls back gracefully
// to the icon instead of showing the browser's broken-image placeholder.
export function ProductThumb({ src, alt, className }: ProductThumbProps) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;
  return (
    <div
      className={cn(
        "shrink-0 h-12 w-12 rounded-lg overflow-hidden bg-green-100 flex items-center justify-center",
        className
      )}
    >
      {showImage ? (
        <img
          src={src as string}
          alt={alt}
          className="w-full h-full object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <ShoppingBasket className="h-5 w-5 text-green-500" />
      )}
    </div>
  );
}
