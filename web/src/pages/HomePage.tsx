import useSWR from "swr";
import { getCategories } from "@/lib/api";
import { StoreView } from "@/components/store/StoreView";
import { Loader } from "@/components/Loader";

// Minimum time the loader stays visible, even if the API is faster.
// Avoids a jarring sub-1s flash of the loader on fast connections.
const MIN_LOADER_MS = 2000;

async function fetchCategoriesWithMinDelay() {
  const [data] = await Promise.all([
    getCategories(),
    new Promise((r) => setTimeout(r, MIN_LOADER_MS)),
  ]);
  return data;
}

export function HomePage() {
  const { data: categories, error } = useSWR(
    "categories",
    fetchCategoriesWithMinDelay
  );

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-muted-foreground">Failed to load products.</p>
      </div>
    );
  }

  if (!categories) return <Loader />;

  return <StoreView categories={categories} />;
}
