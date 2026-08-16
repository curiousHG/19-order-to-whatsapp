import { useEffect, useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import type { Category, Product } from "@/lib/types";
import { useCartStore } from "@/lib/cart-store";
import { Header } from "@/components/layout/Header";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { ProductRow } from "@/components/store/ProductRow";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface StoreViewProps {
  categories: Category[];
}

const SEARCH_LIMIT = 7;

export function StoreView({ categories }: StoreViewProps) {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const items = useCartStore((s) => s.items);

  const active =
    categories.find((c) => c.id === activeId) ?? categories[0] ?? null;

  // Switching category used to reset the page number, which also put you back
  // at the top. With one continuous list, scroll back up explicitly.
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [active?.id]);

  useEffect(() => {
    if (!searchOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [searchOpen]);

  const visibleProducts = useMemo(
    () => active?.products.filter((p) => p.available) ?? [],
    [active]
  );

  const allProducts = useMemo(
    () => categories.flatMap((c) => c.products.filter((p) => p.available)),
    [categories]
  );

  const trimmedQuery = query.trim();

  const searchResults = useMemo<Product[]>(() => {
    if (!trimmedQuery) return [];
    const q = trimmedQuery.toLowerCase();
    return allProducts
      .map((p) => {
        const name = p.name.toLowerCase();
        const desc = (p.description ?? "").toLowerCase();
        const i = name.indexOf(q);
        const j = desc.indexOf(q);
        const score = i >= 0 ? i : j >= 0 ? 1000 + j : -1;
        return { p, score };
      })
      .filter((x) => x.score >= 0)
      .sort((a, b) => a.score - b.score)
      .slice(0, SEARCH_LIMIT)
      .map((x) => x.p);
  }, [trimmedQuery, allProducts]);

  function closeSearch() {
    setSearchOpen(false);
    setQuery("");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header
        onSearchClick={() => setSearchOpen(true)}
        onCartClick={() => setCartOpen(true)}
        cartCount={items.length}
      />

      <div className="md:hidden sticky top-16 z-30 h-13 flex items-center gap-2 overflow-x-auto px-4 bg-green-700 border-b border-green-800 no-scrollbar shrink-0">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveId(cat.id)}
            className={cn(
              "shrink-0 px-3 py-1.5 rounded-full text-sm font-bold transition-colors",
              active?.id === cat.id
                ? "bg-amber-400 text-green-950"
                : "bg-white/15 text-white hover:bg-white/25"
            )}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="flex flex-1">
        <aside className="hidden md:flex flex-col w-52 shrink-0 sticky top-16 self-start h-[calc(100vh-4rem)] overflow-y-auto border-r border-border bg-white">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveId(cat.id)}
              className={cn(
                "text-left px-4 py-3 text-sm font-bold border-b border-border transition-colors",
                active?.id === cat.id
                  ? "bg-amber-500 text-white"
                  : "text-foreground hover:bg-green-50"
              )}
            >
              {cat.name}
            </button>
          ))}
        </aside>

        <main className="flex-1 min-w-0">
          {active && (
            <>
              <CategoryHero
                key={active.id}
                category={active}
                count={visibleProducts.length}
              />

              {visibleProducts.length === 0 ? (
                <p className="px-4 py-10 text-sm text-muted-foreground text-center">
                  No items available in this category
                </p>
              ) : (
                visibleProducts.map((product) => (
                  <ProductRow key={product.id} product={product} />
                ))
              )}
            </>
          )}
        </main>
      </div>

      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col">
          <div className="sticky top-0 bg-white border-b border-border px-3 py-2 flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground ml-2 shrink-0" />
            <Input
              autoFocus
              type="search"
              placeholder="Search products…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 h-10 border-0 focus-visible:ring-0 shadow-none bg-transparent px-0"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="Clear input"
                className="shrink-0 p-1.5 rounded-full hover:bg-gray-100 touch-manipulation"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
            <button
              onClick={closeSearch}
              className="shrink-0 text-sm font-medium text-green-600 px-3 py-2 touch-manipulation"
            >
              Cancel
            </button>
          </div>

          <div className="flex-1 overflow-y-auto pb-20">
            {!trimmedQuery ? (
              <p className="px-4 py-10 text-sm text-muted-foreground text-center">
                Start typing to search across all products
              </p>
            ) : searchResults.length === 0 ? (
              <p className="px-4 py-10 text-sm text-muted-foreground text-center">
                No products match &lsquo;{trimmedQuery}&rsquo;
              </p>
            ) : (
              searchResults.map((product) => (
                <ProductRow key={product.id} product={product} />
              ))
            )}
          </div>
        </div>
      )}

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}

function CategoryHero({
  category,
  count,
}: {
  category: Category;
  count: number;
}) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(category.image) && !failed;
  return (
    <div className="sticky top-[7.25rem] md:top-16 z-10 relative h-20 overflow-hidden">
      {showImage ? (
        <>
          <img
            src={category.image as string}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            onError={() => setFailed(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-r from-green-700 via-green-600 to-green-500" />
      )}
      <div className="relative h-full flex flex-col justify-end px-4 py-3">
        <h2 className="text-2xl font-bold text-white drop-shadow-sm">
          {category.name}
        </h2>
        <p className="text-xs text-white/90 drop-shadow-sm">
          {count} {count === 1 ? "item" : "items"}
        </p>
      </div>
    </div>
  );
}
