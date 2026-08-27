"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { GARMENTS } from "@/lib/garments";
import { DESCRIPTIONS } from "@/lib/descriptions";
import type { Product } from "@/data/products";
import ProductActions from "@/components/ProductActions";
import Image from "next/image";

export default function QuickAddModal({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [product, onClose]);

  const Garment = product ? GARMENTS[product.garment] : null;

  return (
    <AnimatePresence>
      {product && Garment && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
        >
          <motion.div
            aria-hidden
            onClick={onClose}
            className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Shto shpejt ${product.name}`}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 340, damping: 32 }}
            className="relative flex max-h-[88vh] w-full max-w-3xl flex-col overflow-y-auto rounded-[1.75rem] bg-cream shadow-2xl sm:flex-row sm:overflow-hidden"
          >
            <button
              onClick={onClose}
              aria-label="Mbyll shtimin e shpejtë"
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-ink/5 text-ink transition-colors hover:bg-ink/10"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>

            <div className="relative flex h-56 shrink-0 items-center justify-center bg-cream-dim sm:h-auto sm:w-2/5">
              <div
                aria-hidden
                className="absolute h-48 w-48 rounded-full bg-ink/5 blur-3xl"
              />
              {product.isNew && (
                <span className="absolute left-5 top-5 rounded-full bg-rust px-2.5 py-1 text-[10px] font-semibold tracking-wide text-cream">
                  E RE
                </span>
              )}
              {/* <Garment
                className={`relative h-44 w-auto drop-shadow-[0_20px_24px_rgba(32,26,21,0.2)] sm:h-64 ${product.color}`}
              /> */}
              <Image
                src={product.image}
                alt=""
                width={160}
                height={160}
                draggable={false}
                className={`relative h-44 w-auto drop-shadow-[0_20px_24px_rgba(32,26,21,0.2)] sm:h-64 ${product.color}`}
              />
            </div>

            <div className="flex-1 p-6 sm:p-8">
              <p className="text-xs font-semibold tracking-[0.3em] text-rust">
                SHTO SHPEJT
              </p>
              <h2 className="mt-2 font-display text-2xl text-ink sm:text-3xl">
                {product.name}
              </h2>
              <p className="mt-1 text-sm text-ink-soft">{product.category}</p>
              <p className="mt-3 text-xl font-semibold text-ink">
                ${product.price}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                {DESCRIPTIONS[product.category]}
              </p>

              <div className="mt-6">
                <ProductActions />
              </div>

              <Link
                href={`/shop/${product.id}`}
                onClick={onClose}
                className="mt-5 inline-block text-sm font-medium text-ink-soft underline decoration-ink-soft/40 underline-offset-4 transition-colors hover:text-ink"
              >
                Shiko detajet e plota →
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
