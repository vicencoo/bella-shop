"use client";

import { useLayoutEffect, useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useAnimationFrame,
  type MotionValue,
  type PanInfo,
} from "framer-motion";
import Link from "next/link";
import { GARMENTS, HangerIcon } from "@/lib/garments";
import { products, type Product } from "@/data/products";
import QuickAddModal from "@/components/QuickAddModal";

// Runs before the browser paints on the client, so the initial centering
// below never flashes the wrong layout first. No-op on the server.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const COPIES = 3; // buffer copies on either side of the "real" one, for a seamless loop

// Three back-to-back copies of the catalog so the rail can wrap around
// endlessly — products scroll off one edge and the identical copy already
// waiting on the other edge takes over, so the loop never visibly resets.
const loopedItems = Array.from({ length: COPIES }, (_, copy) =>
  products.map((product) => ({ product, copy })),
).flat();

function GarmentHanger({
  product,
  index,
  pointerX,
  suppressClickRef,
  onQuickAdd,
}: {
  product: Product;
  index: number;
  // NaN whenever nothing is updating it (e.g. touch devices never attach
  // the mousemove listener that drives this) — the transform below already
  // treats NaN as "no effect," so this alone makes the sway desktop-only.
  pointerX: MotionValue<number>;
  suppressClickRef: React.RefObject<boolean>;
  onQuickAdd: (product: Product) => void;
}) {
  const itemRef = useRef<HTMLDivElement>(null);
  const Garment = GARMENTS[product.garment];

  // A faint sway as the cursor passes nearby — a hint of the old proximity
  // swing, dialed way down (small angle, tight radius) rather than the
  // wide, constant tilt it used to be.
  const rawSwing = useTransform(pointerX, (px) => {
    if (Number.isNaN(px) || !itemRef.current) return 0;
    const rect = itemRef.current.getBoundingClientRect();
    const center = rect.left + rect.width / 2;
    const dist = px - center;
    const range = 130;
    const clamped = Math.max(-range, Math.min(range, dist));
    return (clamped / range) * -3.5;
  });
  const swing = useSpring(rawSwing, { stiffness: 150, damping: 16, mass: 0.4 });

  return (
    <div
      className="idle-sway shrink-0"
      style={{ animationDelay: `${(index % 5) * 0.35}s`, animationDuration: `${4.2 + (index % 4) * 0.5}s` }}
    >
      <div className="group flex w-36 flex-col items-center px-3 sm:w-40">
        <Link
          href={`/shop/${product.id}`}
          draggable={false}
          onClick={(e) => {
            if (suppressClickRef.current) {
              e.preventDefault();
            }
          }}
          className="flex flex-col items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rust/70 focus-visible:ring-offset-2 focus-visible:ring-offset-wood rounded-2xl"
        >
          <motion.div
            ref={itemRef}
            style={{ rotate: swing, transformOrigin: "top center" }}
            className="origin-top transition-transform duration-300 ease-out group-hover:scale-[1.07]"
          >
            <HangerIcon className="h-8 w-auto text-neutral-400 transition-colors group-hover:text-rust" />
            <div className="relative cursor-pointer">
              <Garment
                className={`h-40 w-auto drop-shadow-[0_18px_18px_rgba(0,0,0,0.45)] ${product.color}`}
              />
              {product.isNew && (
                <span className="absolute -right-2 top-1 rounded-full bg-rust px-2 py-0.5 text-[9px] font-semibold tracking-wide text-cream">
                  E RE
                </span>
              )}
            </div>
          </motion.div>
          <div
            aria-hidden
            className="mt-1 h-2 w-24 rounded-full bg-black/40 blur-md transition-opacity duration-300 group-hover:opacity-70"
          />
          <p className="mt-3 text-center text-sm font-medium text-cream/90 transition-colors group-hover:text-cream">
            {product.name}
          </p>
          <p className="text-xs text-cream/50">${product.price}</p>
        </Link>

        <button
          onClick={() => {
            if (suppressClickRef.current) return;
            onQuickAdd(product);
          }}
          className="mt-3 flex items-center gap-1.5 rounded-full border border-cream/25 bg-cream/5 px-3.5 py-1.5 text-[11px] font-medium tracking-wide text-cream/80 opacity-90 backdrop-blur-sm transition-all duration-200 hover:border-rust/60 hover:bg-rust/20 hover:text-cream hover:opacity-100 active:scale-95"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
            <path d="M12 5v14M5 12h14" strokeLinecap="round" />
          </svg>
          Shto Shpejt
        </button>
      </div>
    </div>
  );
}

export default function WardrobeRail() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxDrag, setMaxDrag] = useState(0);
  const maxDragRef = useRef(0);
  const setWidthRef = useRef(0); // width of one full copy of the catalog
  const hasCenteredRef = useRef(false);
  const [quickAddProduct, setQuickAddProduct] = useState<Product | null>(null);

  const x = useMotionValue(0);
  const pointerX = useMotionValue<number>(NaN);

  // Real inertial motion for the wheel: each tick adds an impulse to a
  // velocity, which then decays with friction every frame — so scrolling
  // coasts to a stop like a real rail instead of snapping to a target.
  const wheelVelocityRef = useRef(0);
  const isDraggingRef = useRef(false);

  // Distinguishes a genuine drag from a tap so product links stay clickable
  // while the rail itself stays draggable.
  const suppressClickRef = useRef(false);
  const dragStartXRef = useRef(0);

  // The proximity sway is a desktop nicety — only devices with a real mouse
  // (hover + fine pointer) ever update pointerX, so touch never gets it.
  const supportsHoverRef = useRef(false);
  useEffect(() => {
    supportsHoverRef.current = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
  }, []);

  useIsomorphicLayoutEffect(() => {
    function measure() {
      if (!trackRef.current || !containerRef.current) return;
      const setWidth = trackRef.current.scrollWidth / COPIES;
      setWidthRef.current = setWidth;

      const overflow =
        trackRef.current.scrollWidth - containerRef.current.offsetWidth;
      const next = Math.max(0, overflow);
      setMaxDrag(next);
      maxDragRef.current = next;

      // Center the middle copy's first item in the viewport so the row
      // opens balanced instead of pinned to the left edge — with a full
      // buffer copy free to scroll into on either side. Keeps re-centering
      // on resize (and re-running once more via rAF right after mount, in
      // case fonts/scrollbars shift layout a frame late) until the visitor
      // actually touches the rail. Uses scrollWidth/offsetWidth (the
      // element's own layout size) rather than getBoundingClientRect,
      // because rect() reports the CURRENT on-screen position — which
      // already includes whatever x offset a previous centering pass
      // applied, so re-measuring with rects would compute a fresh delta
      // from an already-shifted position and drag the row back toward 0
      // every time this reruns instead of confirming the same target.
      if (!hasCenteredRef.current) {
        const middleFirstItem = trackRef.current.children[
          products.length
        ] as HTMLElement | undefined;
        if (middleFirstItem) {
          const itemCenter = setWidth + middleFirstItem.offsetWidth / 2;
          const desiredCenter = containerRef.current.offsetWidth / 2;
          x.set(desiredCenter - itemCenter);
        }
      }
    }
    measure();
    const raf = requestAnimationFrame(measure);
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
    };
  }, []);

  useAnimationFrame((_, dt) => {
    // While framer-motion is actively driving x from pointer movement, it
    // tracks its own internal drag origin — mutating x ourselves here would
    // fight that and snap back next frame. So wrapping only happens between
    // gestures (idle or wheel-coasting); a single continuous drag never
    // covers a full catalog-width anyway.
    if (isDraggingRef.current) return;

    if (Math.abs(wheelVelocityRef.current) > 0.02) {
      const frames = dt / (1000 / 60);
      x.set(x.get() - wheelVelocityRef.current * frames);
      wheelVelocityRef.current *= Math.pow(0.9, frames);
    } else {
      wheelVelocityRef.current = 0;
    }

    // Seamless infinite wrap: once the scroll position drifts into the
    // outer buffer copy, silently jump back by exactly one catalog-width —
    // since every copy is pixel-identical, the jump is invisible.
    const setWidth = setWidthRef.current;
    if (setWidth > 0) {
      const current = x.get();
      if (current <= -setWidth * 2) {
        x.set(current + setWidth);
      } else if (current >= 0) {
        x.set(current - setWidth);
      }
    }
  });

  function handleWheel(e: React.WheelEvent) {
    const raw = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (raw === 0) return;
    e.preventDefault();
    hasCenteredRef.current = true;

    const clamped = Math.max(-300, Math.min(300, raw));
    wheelVelocityRef.current += clamped * 0.11;
    wheelVelocityRef.current = Math.max(-45, Math.min(45, wheelVelocityRef.current));
  }

  function handlePointerDown() {
    suppressClickRef.current = false;
    hasCenteredRef.current = true;
  }

  function handleDragStart(_: unknown, info: PanInfo) {
    isDraggingRef.current = true;
    wheelVelocityRef.current = 0;
    dragStartXRef.current = info.point.x;
  }

  function handleDrag(_: unknown, info: PanInfo) {
    if (Math.abs(info.point.x - dragStartXRef.current) > 6) {
      suppressClickRef.current = true;
    }
  }

  function handleDragEnd() {
    isDraggingRef.current = false;
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-wood-light via-wood to-wood-dark py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.25]"
        style={{
          background:
            "repeating-linear-gradient(100deg, rgba(255,255,255,0.035) 0px, rgba(255,255,255,0.035) 1px, transparent 1px, transparent 34px)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/50 to-transparent"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.3em] text-rust">
              RAFTI
            </p>
            <h2 className="mt-2 font-display text-3xl text-cream sm:text-4xl">
              Sapo nxjerrë nga varësja
            </h2>
          </div>
          <p className="flex items-center gap-2 text-sm text-cream/50">
            Zvarrit për të shfletuar, kliko një artikull për ta blerë
            <svg width="18" height="12" viewBox="0 0 24 16" fill="none" stroke="currentColor" strokeWidth={1.6}>
              <path d="M1 8h20M15 2l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </p>
        </div>
      </div>

      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-wood-dark to-transparent sm:w-28"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-wood-dark to-transparent sm:w-28"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-7 h-[3px] bg-gradient-to-r from-transparent via-neutral-300/80 to-transparent shadow-[0_1px_2px_rgba(0,0,0,0.4)]"
        />

        <div
          ref={containerRef}
          onWheel={handleWheel}
          onMouseMove={(e) => {
            if (supportsHoverRef.current) pointerX.set(e.clientX);
          }}
          onMouseLeave={() => pointerX.set(NaN)}
          className="no-scrollbar overflow-hidden px-6 sm:px-10"
        >
          <motion.div
            ref={trackRef}
            drag="x"
            dragConstraints={{ left: -maxDrag, right: 0 }}
            dragElastic={0.06}
            dragTransition={{ power: 0.3, timeConstant: 280, restDelta: 0.5 }}
            onPointerDown={handlePointerDown}
            onDragStart={handleDragStart}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            style={{ x }}
            className="flex w-max cursor-grab gap-3 pt-6 pb-4 active:cursor-grabbing sm:gap-5"
          >
            {loopedItems.map(({ product, copy }, i) => (
              <GarmentHanger
                key={`${product.id}-${copy}`}
                product={product}
                index={i}
                pointerX={pointerX}
                suppressClickRef={suppressClickRef}
                onQuickAdd={setQuickAddProduct}
              />
            ))}
          </motion.div>
        </div>
      </div>

      <div className="relative mx-auto mt-8 max-w-6xl px-6 text-center">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-sm font-medium text-cream/80 underline decoration-rust/60 underline-offset-4 transition-colors hover:text-cream"
        >
          Shiko koleksionin e plotë →
        </Link>
      </div>

      <QuickAddModal
        product={quickAddProduct}
        onClose={() => setQuickAddProduct(null)}
      />
    </section>
  );
}
