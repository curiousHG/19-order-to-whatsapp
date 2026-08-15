import { useEffect, useState } from "react";
import useSWR from "swr";
import { getCategories } from "@/lib/api";
import { StoreView } from "@/components/store/StoreView";
import { Loader } from "@/components/Loader";

const MIN_LOADER_MS = 2000;
const LOGO_WAIT_CEILING_MS = 5000;

const fetchCategoriesWithMinDelay = async () => {
  const [data] = await Promise.all([
    getCategories(),
    new Promise((r) => setTimeout(r, MIN_LOADER_MS)),
  ]);
  return data;
}

const useLogoReady = (src: string) => {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let cancelled = false;
    const done = () => !cancelled && setReady(true);
    const img = new Image();
    img.onload = done;
    img.onerror = done;
    img.src = src;
    if (img.complete) done();
    const ceiling = setTimeout(done, LOGO_WAIT_CEILING_MS);
    return () => {
      cancelled = true;
      clearTimeout(ceiling);
    };
  }, [src]);
  return ready;
}

export const HomePage = () => {
  const { data: categories, error } = useSWR(
    "categories",
    fetchCategoriesWithMinDelay
  );
  const logoReady = useLogoReady("/logo.webp");

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-muted-foreground">Failed to load products.</p>
      </div>
    );
  }

  if (!categories || !logoReady) return <Loader />;

  return <StoreView categories={categories} />;
}
