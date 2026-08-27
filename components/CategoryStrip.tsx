import Link from "next/link";
import { GARMENTS } from "@/lib/garments";

const CATEGORIES = [
  { name: "Bluza", garment: "tee", color: "text-stone-800" },
  { name: "Veshje të Jashtme", garment: "jacket", color: "text-neutral-900" },
  { name: "Fustane", garment: "dress", color: "text-rose-800" },
  { name: "Pantallona", garment: "trousers", color: "text-olive" },
] as const;

export default function CategoryStrip() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="mb-10">
        <p className="text-xs font-semibold tracking-[0.3em] text-rust">
          SHFLETO
        </p>
        <h2 className="mt-2 font-display text-3xl text-ink sm:text-4xl">
          Bli sipas kategorisë
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {CATEGORIES.map((cat) => {
          const Garment = GARMENTS[cat.garment];
          return (
            <Link
              key={cat.name}
              href={`/shop?category=${encodeURIComponent(cat.name)}`}
              className="group relative flex flex-col items-center overflow-hidden rounded-3xl bg-cream-dim px-4 py-10 transition-shadow hover:shadow-[0_18px_40px_-18px_rgba(32,26,21,0.25)]"
            >
              <div
                aria-hidden
                className="absolute h-28 w-28 rounded-full bg-ink/5 blur-2xl transition-transform duration-500 group-hover:scale-125"
              />
              <Garment
                className={`relative h-28 w-auto transition-transform duration-500 group-hover:-translate-y-1.5 group-hover:scale-110 ${cat.color}`}
              />
              <p className="relative mt-5 text-sm font-medium text-ink">
                {cat.name}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
