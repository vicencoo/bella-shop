const WORDS = [
  "TRANSPORT FALAS MBI $75",
  "TË REJA ÇDO JAVË",
  "BËRË PËR TË ZGJATUR",
  "KTHIME TË LEHTA BRENDA 30 DITËVE",
];

export default function Marquee() {
  const items = [...WORDS, ...WORDS];
  return (
    <div className="overflow-hidden border-y border-ink/10 bg-ink py-3">
      <div className="marquee flex w-max gap-10 whitespace-nowrap">
        {[...items, ...items].map((word, i) => (
          <span
            key={i}
            className="flex items-center gap-10 text-xs font-medium tracking-[0.2em] text-cream/80"
          >
            {word}
            <span className="h-1 w-1 rounded-full bg-rust" />
          </span>
        ))}
      </div>
    </div>
  );
}
