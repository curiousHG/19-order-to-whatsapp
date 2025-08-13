// Catalog.tsx
import { useEffect, useMemo, forwardRef } from "react";
import { Virtuoso, type VirtuosoHandle } from "react-virtuoso";
import { useCatalogStore } from "../store/useCatalogStore";
import CategoryHeader from "./CategoryHeader";
import Product from "./Product";
import type { Category as CategoryType } from "../api/categories";
import type { Product as ProductType } from "../api/products";

// Skeleton component for categories
const CategorySkeleton = () => (
  <div className="relative flex h-20 w-full animate-pulse items-center justify-center rounded-lg bg-gray-200" />
);

// Skeleton component for products
const ProductSkeleton = () => (
  <li className="flex animate-pulse items-center gap-3 rounded-lg bg-white/80 p-2 shadow-sm">
    <div className="size-15 rounded bg-gray-200" />
    <div className="flex flex-1 flex-col gap-1">
      <div className="h-4 w-2/3 rounded bg-gray-200" />
      <div className="h-3 w-1/3 rounded bg-gray-200" />
    </div>
    <div className="h-7 w-20 rounded bg-gray-200" />
  </li>
);

export const Catalog = forwardRef<VirtuosoHandle>((_props, ref) => {
  const {
    categories,
    productsByCategoryId,
    loadingCategories,
    loadingProducts,
    fetchCategories,
    fetchProducts,
    setCategoryIndexMap,
    searchQuery,
    filteredProducts
  } = useCatalogStore();


  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Flatten: each category header + its products
  const items = useMemo(() => {
    if (loadingCategories) {
      // Show placeholders for categories + products during initial load
      return Array.from({ length: 3 }).flatMap(() => [
        { type: "category-skeleton" },
        ...Array.from({ length: 5 }).map(() => ({ type: "product-skeleton" }))
      ]);
    }

    return categories.flatMap((cat) => [
      { type: "category", category: cat, categoryId: cat.id },
      ...(productsByCategoryId[cat.id] || []).map((prod) => ({
        type: "product",
        product: prod,
        categoryId: cat.id
      })),
      ...(loadingProducts[cat.id]
        ? Array.from({ length: 5 }).map(() => ({
            type: "product-skeleton"
          }))
        : [])
    ]);
  }, [categories, loadingCategories, loadingProducts, productsByCategoryId]);

  // Build categoryIndexMap when items change
  useEffect(() => {
    if (loadingCategories) return;
    const map: Record<number, number> = {};
    items.forEach((item, index) => {
      if (item.type === "category" && "categoryId" in item) {
        map[(item as { categoryId: number }).categoryId] = index;
      }
    });
    setCategoryIndexMap(map);
  }, [items, loadingCategories, setCategoryIndexMap]);

  if (searchQuery){
    return (
      <div className="p-3 space-y-3">
      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500 italic">No products found.</p>
      ) : (
        filteredProducts.map((product) => (
          <Product key={product.id} product={product} />
        ))
      )}
    </div>
    );
  }


  return (
    <div style={{ height: "100dvh" }} className="p-4 pt-30">
      {/* remove lines between rows */}
      <Virtuoso
        ref={ref}
        data={items}
        itemContent={(_index, item) => {
          if (item.type === "category") {
            const categoryItem = item as {
              type: "category";
              category: CategoryType;
            };
            return (
              <CategoryHeader
                category={categoryItem.category}
                onVisible={() => fetchProducts(categoryItem.category.id)}
              />
            );
          }
          if (item.type === "product") {
            const productItem = item as {
              type: "product";
              product: ProductType;
              categoryId: number;
            };
            return <Product product={productItem.product} />;
          }
          if (item.type === "category-skeleton") return <CategorySkeleton />;
          if (item.type === "product-skeleton") return <ProductSkeleton />;
          return null;
        }}
      />
    </div>
  );
});
