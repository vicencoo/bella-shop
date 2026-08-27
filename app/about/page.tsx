import type { Metadata } from "next";
import Link from "next/link";
import {
  HoodieGarment,
  SweaterGarment,
  TeeGarment,
  TrousersGarment,
} from "@/lib/garments";

export const metadata: Metadata = {
  title: "Rreth Nesh — BELLA",
  description: "Historia, vlerat dhe njerëzit pas BELLA.",
};

const VALUES = [
  {
    title: "Bërë për të zgjatur",
    body: "Pëlhura më të trasha, qepje të forcuara, kopsa që qëndrojnë. Nëse prishet brenda një viti, kemi bërë diçka gabim.",
  },
  {
    title: "Në sasi të vogla",
    body: "Prodhojmë në sasi të kufizuara me punishte që i njohim vërtet, në vend që të ndjekim koleksione të pafundme sezonale.",
  },
  {
    title: "Çmime të ndershme",
    body: "Pa lojëra çmimesh të fryra e pastaj të ulura. Çmimi që sheh pasqyron atë çfarë kushton vërtet të bësh diçka mirë.",
  },
];

const STATS = [
  { value: "12", label: "Punishte partnere" },
  { value: "48k+", label: "Pjesë të veshura çdo ditë" },
  { value: "30-ditë", label: "Kthime pa pyetje" },
  { value: "2019", label: "Themeluar" },
];

export default function AboutPage() {
  return (
    <div>
      <section className="mx-auto max-w-4xl px-6 pt-20 pb-14 text-center">
        <p className="text-xs font-semibold tracking-[0.3em] text-rust">
          RRETH BELLA
        </p>
        <h1 className="text-balance mt-4 font-display text-4xl leading-tight text-ink sm:text-5xl">
          I bëjmë rrobat ngadalë, me qëllim.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-ink-soft">
          BELLA nisi në një studio me një dhomë të vetme, një makinë qepëse
          dhe një bindje kokëfortë: veshjet duhet të bëhen për t&rsquo;u
          mbajtur me vite, jo për një sezon të vetëm.
        </p>
      </section>

      <section className="relative mx-auto flex max-w-5xl items-center justify-center gap-4 px-6 py-10 sm:gap-8">
        <div aria-hidden className="pointer-events-none absolute h-56 w-56 rounded-full bg-rust/10 blur-3xl" />
        {[TeeGarment, HoodieGarment, SweaterGarment, TrousersGarment].map(
          (G, i) => (
            <G
              key={i}
              className={`relative h-28 w-auto drop-shadow-xl sm:h-40 ${
                ["text-stone-800", "text-rust", "text-olive", "text-neutral-900"][i]
              } ${i % 2 === 0 ? "-rotate-6" : "rotate-6"}`}
            />
          ),
        )}
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-6 sm:grid-cols-3">
          {VALUES.map((v) => (
            <div
              key={v.title}
              className="rounded-3xl bg-cream-dim p-8 transition-shadow hover:shadow-[0_18px_40px_-18px_rgba(32,26,21,0.25)]"
            >
              <h3 className="font-display text-xl text-ink">{v.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                {v.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-ink py-16">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-6 text-center sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="font-display text-3xl text-cream sm:text-4xl">
                {s.value}
              </p>
              <p className="mt-2 text-xs tracking-wide text-cream/50">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <p className="font-display text-2xl italic leading-relaxed text-ink sm:text-3xl">
          &ldquo;Ne nuk dizajnojmë për cikle modash. Dizajnojmë për vitin e
          tretë që e ke pjesën, jo për foton e parë të saj.&rdquo;
        </p>
        <p className="mt-4 text-sm text-ink-soft">
          &mdash; Themeluesja, BELLA
        </p>

        <Link
          href="/shop"
          className="mt-9 inline-block rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-cream transition-transform hover:scale-105"
        >
          Shiko koleksionin
        </Link>
      </section>
    </div>
  );
}
