"use client";

import Link from "next/link";
import { useState } from "react";

const COLUMNS: { title: string; links: string[] }[] = [
  {
    title: "Dyqani",
    links: ["Të Rejat", "Bluza", "Veshje të Jashtme", "Fustane", "Pantallona"],
  },
  { title: "Kompania", links: ["Rreth Nesh", "Qëndrueshmëria", "Karriera", "Shtypi"] },
  { title: "Ndihmë", links: ["Kontakt", "Transporti", "Kthimet", "Udhëzues Madhësish"] },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <footer className="mt-24 border-t border-ink/10 bg-cream-dim">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl text-ink">BELLA</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-soft">
              Veshje të përditshme, të bëra me kujdes. Të dizajnuara për t&rsquo;u
              veshur, jo vetëm për t&rsquo;u varur &mdash; megjithëse edhe këtë e
              bëjnë mjaft mirë.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!email) return;
                setSubmitted(true);
                setEmail("");
              }}
              className="mt-6 flex max-w-xs gap-2"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email-i juaj"
                className="w-full rounded-full border border-ink/15 bg-cream px-4 py-2.5 text-sm outline-none transition-colors focus:border-rust"
              />
              <button
                type="submit"
                className="shrink-0 rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-cream transition-transform hover:scale-105 active:scale-95"
              >
                Bashkohu
              </button>
            </form>
            <p
              className={`mt-2 text-xs text-rust transition-opacity duration-300 ${
                submitted ? "opacity-100" : "opacity-0"
              }`}
            >
              Faleminderit — je në listë.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-semibold text-ink">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <Link
                      href="#"
                      className="text-sm text-ink-soft transition-colors hover:text-rust"
                    >
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-ink/10 pt-6 text-xs text-ink-soft sm:flex-row">
          <p>&copy; {new Date().getFullYear()} BELLA. Të gjitha të drejtat e rezervuara.</p>
          <div className="flex gap-5">
            <Link href="#" className="hover:text-ink">Instagram</Link>
            <Link href="#" className="hover:text-ink">Pinterest</Link>
            <Link href="#" className="hover:text-ink">TikTok</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
