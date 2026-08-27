"use client";

import { useState } from "react";
import { GARMENTS } from "@/lib/garments";
import type { Product } from "@/data/products";

export default function ProductCard({ product }: { product: Product }) {
  const Garment = GARMENTS[product.garment];
  const [added, setAdded] = useState(false);

  return (
    <div className="drift-in group relative overflow-hidden rounded-3xl bg-cream-dim p-6 transition-shadow hover:shadow-[0_18px_40px_-18px_rgba(32,26,21,0.25)]">
      {product.isNew && (
        <span className="absolute left-5 top-5 rounded-full bg-rust px-2.5 py-1 text-[10px] font-semibold tracking-wide text-cream">
          E RE
        </span>
      )}

      <div className="relative flex h-64 items-center justify-center">
        <div
          aria-hidden
          className="absolute h-40 w-40 rounded-full bg-ink/5 blur-2xl transition-transform duration-500 group-hover:scale-110"
        />
        <Garment
          className={`relative h-52 w-auto drop-shadow-[0_16px_20px_rgba(32,26,21,0.18)] transition-transform duration-500 ease-out group-hover:-translate-y-1.5 group-hover:scale-[1.05] ${product.color}`}
        />
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-ink-soft/70">
            {product.category}
          </p>
          <h3 className="mt-1 font-display text-lg text-ink">{product.name}</h3>
        </div>
        <p className="shrink-0 pt-1 text-sm font-semibold text-ink">
          ${product.price}
        </p>
      </div>

      <button
        onClick={() => {
          setAdded(true);
          setTimeout(() => setAdded(false), 1600);
        }}
        className={`mt-4 w-full rounded-full py-2.5 text-sm font-medium transition-all duration-300 ${
          added
            ? "bg-olive text-cream"
            : "bg-ink text-cream hover:bg-rust"
        }`}
      >
        {added ? "U shtua në shportë ✓" : "Shto në shportë"}
      </button>
    </div>
  );
}
