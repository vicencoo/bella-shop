import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Kontakt — BELLA",
  description: "Na kontakto ekipin e BELLA.",
};

const INFO = [
  {
    title: "Email",
    body: "hello@bella-clothing.example",
    icon: (
      <path d="M4 6h16v12H4V6Zm0 0 8 7 8-7" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    title: "Studio",
    body: "142 Maker Street, Suite 3, Portland OR",
    icon: (
      <>
        <path d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21Z" strokeLinejoin="round" />
        <circle cx="12" cy="9.5" r="2.4" />
      </>
    ),
  },
  {
    title: "Orari",
    body: "Hën–Premte, 9:00–17:00",
    icon: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7.5V12l3 2" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <div className="max-w-xl">
        <p className="text-xs font-semibold tracking-[0.3em] text-rust">
          NA KONTAKTO
        </p>
        <h1 className="mt-3 font-display text-4xl text-ink sm:text-5xl">
          Do të donim të dëgjonim nga ti
        </h1>
        <p className="mt-4 text-ink-soft">
          Pyetje rreth një porosie, madhësive, apo thjesht dëshiron të na
          përshëndetësh? Na dërgo një mesazh dhe një person i vërtetë do të
          të përgjigjet.
        </p>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.1fr]">
        <div className="space-y-4">
          {INFO.map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-4 rounded-2xl border border-ink/10 p-5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rust/10 text-rust">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7}>
                  {item.icon}
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-ink">{item.title}</p>
                <p className="mt-0.5 text-sm text-ink-soft">{item.body}</p>
              </div>
            </div>
          ))}

          <div className="overflow-hidden rounded-2xl border border-ink/10">
            <div className="relative flex h-40 items-center justify-center bg-[radial-gradient(circle_at_30%_30%,var(--color-cream-dim),var(--color-ink)_140%)]">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="var(--color-rust)" strokeWidth={1.8} className="relative">
                <path d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21Z" strokeLinejoin="round" />
                <circle cx="12" cy="9.5" r="2.4" />
              </svg>
              <p className="absolute bottom-3 text-xs text-cream/60">
                Portland, Oregon
              </p>
            </div>
          </div>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
