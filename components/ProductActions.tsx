"use client";

import { useState } from "react";

const SIZES = ["XS", "S", "M", "L", "XL"];

export default function ProductActions() {
  const [size, setSize] = useState("M");
  const [added, setAdded] = useState(false);

  return (
    <div>
      <div>
        <p className="text-sm font-medium text-ink">Madhësia</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {SIZES.map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={`h-11 w-11 rounded-full text-sm font-medium transition-colors ${
                size === s
                  ? "bg-ink text-cream"
                  : "bg-cream-dim text-ink-soft hover:text-ink"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() => {
          setAdded(true);
          setTimeout(() => setAdded(false), 1800);
        }}
        className={`mt-7 w-full rounded-full py-3.5 text-sm font-medium transition-all duration-300 sm:w-72 ${
          added ? "bg-olive text-cream" : "bg-ink text-cream hover:bg-rust"
        }`}
      >
        {added ? `U shtua — Madhësia ${size} ✓` : `Shto në shportë — Madhësia ${size}`}
      </button>
    </div>
  );
}
