import { Suspense } from "react";
import type { Metadata } from "next";
import ShopGrid from "@/components/ShopGrid";

export const metadata: Metadata = {
  title: "Dyqani — BELLA",
  description: "Shfleto koleksionin e plotë BELLA me veshje të përditshme.",
};

export default function ShopPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-10 max-w-xl">
        <p className="text-xs font-semibold tracking-[0.3em] text-rust">
          KOLEKSIONI
        </p>
        <h1 className="mt-3 font-display text-4xl text-ink sm:text-5xl">
          Blej gjithçka
        </h1>
        <p className="mt-4 text-ink-soft">
          Çdo pjesë që krijojmë, në një vend. Filtro sipas kategorisë për të
          gjetur të preferuarën tënde të radhës.
        </p>
      </div>

      <Suspense fallback={null}>
        <ShopGrid />
      </Suspense>
    </div>
  );
}
