import Link from "next/link";
import { DressGarment, JacketGarment } from "@/lib/garments";

export default function Editorial() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="grid items-center gap-10 rounded-[2rem] bg-ink px-8 py-14 sm:px-14 md:grid-cols-2">
        <div>
          <p className="text-xs font-semibold tracking-[0.3em] text-rust">
            HISTORIA JONË
          </p>
          <h2 className="mt-3 font-display text-3xl leading-tight text-cream sm:text-4xl">
            Më pak gjëra, por më të mira &mdash; bërë që vërtet të konsumohen.
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-cream/60">
            Punojmë me fabrika të vogla dhe punishte familjare për të krijuar
            veshje që mbajnë formën larje pas larjeje. Pa truke sezonale,
            vetëm pjesë që do t&rsquo;i zgjedhësh sërish e sërish.
          </p>
          <Link
            href="/about"
            className="mt-7 inline-block rounded-full bg-cream px-6 py-3 text-sm font-medium text-ink transition-transform hover:scale-105"
          >
            Lexo historinë tonë
          </Link>
        </div>

        <div className="relative flex h-64 items-center justify-center gap-6 sm:h-72">
          <div aria-hidden className="absolute h-48 w-48 rounded-full bg-rust/20 blur-3xl" />
          <JacketGarment className="relative h-48 w-auto -rotate-6 text-cream/90 drop-shadow-2xl sm:h-56" />
          <DressGarment className="relative h-52 w-auto rotate-6 text-rust drop-shadow-2xl sm:h-60" />
        </div>
      </div>
    </section>
  );
}
