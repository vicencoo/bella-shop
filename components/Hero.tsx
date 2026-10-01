import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pt-16 pb-20 sm:pt-24 sm:pb-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-[-10%] h-[420px] w-[420px] rounded-full bg-rust/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 left-[-10%] h-[380px] w-[380px] rounded-full bg-olive/15 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl">
        <p className="drift-in text-xs font-semibold tracking-[0.3em] text-rust">
          KOLEKSIONI VJESHTË / DIMËR
        </p>
        <h1
          className="drift-in mt-5 max-w-2xl text-balance font-display text-5xl leading-[1.05] text-ink sm:text-6xl md:text-7xl"
          style={{ animationDelay: "0.08s" }}
        >
          Rroba që ia vlen{" "}
          <span className="italic text-rust">t&rsquo;i vishesh</span>.
        </h1>
        <p
          className="drift-in mt-6 max-w-md text-balance text-base leading-relaxed text-ink-soft sm:text-lg"
          style={{ animationDelay: "0.16s" }}
        >
          Pjesë të përditshme, të prera mirë dhe të qëndrueshme. Hidhi një sy
          asaj që sapo doli nga rafti &mdash; fjalë për fjalë, lëviz poshtë.
        </p>

        <div
          className="drift-in mt-9 flex flex-wrap items-center gap-4"
          style={{ animationDelay: "0.24s" }}
        >
          <Link
            href="/shop"
            className="rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-cream transition-transform hover:scale-105 active:scale-95"
          >
            Shiko koleksionin
          </Link>
          <Link
            href="/about"
            className="rounded-full border border-ink/15 px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:border-ink/40"
          >
            Historia jonë
          </Link>

          <button
            className="border py-3.5 px-7 rounded-full text-sm font-medium border-ink/15 cursor-pointer"
            onClick={() => {}}
          >
            Request here
          </button>
        </div>
      </div>
    </section>
  );
}
