"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { products, type Category } from "@/data/products";

const CATEGORIES: (Category | "Të Gjitha")[] = [
  "Të Gjitha",
  "Bluza",
  "Veshje të Jashtme",
  "Fustane",
  "Pantallona",
];

export default function ShopGrid() {
  const params = useSearchParams();
  const initial = (params.get("category") as Category | null) ?? "Të Gjitha";
  const [active, setActive] = useState<(typeof CATEGORIES)[number]>(
    CATEGORIES.includes(initial) ? initial : "Të Gjitha",
  );

  const filtered = useMemo(
    () =>
      active === "Të Gjitha"
        ? products
        : products.filter((p) => p.category === active),
    [active],
  );

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2.5">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
              active === cat
                ? "bg-ink text-cream"
                : "bg-cream-dim text-ink-soft hover:text-ink"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product, i) => (
          <div
            key={product.id}
            style={{ animationDelay: `${(i % 6) * 0.06}s` }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-20 text-center text-ink-soft">
          Ende nuk ka artikuj në këtë kategori — kontrollo përsëri së shpejti.
        </p>
      )}
    </div>
  );
}
