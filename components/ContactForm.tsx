"use client";

import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="drift-in flex h-full flex-col items-center justify-center rounded-3xl bg-cream-dim p-10 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-olive text-cream">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="mt-5 font-display text-xl text-ink">Mesazhi u dërgua</h3>
        <p className="mt-2 max-w-xs text-sm text-ink-soft">
          Faleminderit që na kontaktove — ekipi ynë përgjigjet zakonisht
          brenda një dite pune.
        </p>
        <button
          onClick={() => setSent(false)}
          className="mt-6 text-sm font-medium text-rust hover:underline"
        >
          Dërgo një mesazh tjetër
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="space-y-5 rounded-3xl bg-cream-dim p-8"
    >
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink">
          Emri
        </label>
        <input
          required
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          placeholder="Elira Krasniqi"
          className="w-full rounded-xl border border-ink/15 bg-cream px-4 py-3 text-sm outline-none transition-colors focus:border-rust"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink">
          Email
        </label>
        <input
          required
          type="email"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          placeholder="elira@shembull.com"
          className="w-full rounded-xl border border-ink/15 bg-cream px-4 py-3 text-sm outline-none transition-colors focus:border-rust"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink">
          Mesazhi
        </label>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          placeholder="Si mund të ndihmojmë?"
          className="w-full resize-none rounded-xl border border-ink/15 bg-cream px-4 py-3 text-sm outline-none transition-colors focus:border-rust"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-full bg-ink py-3.5 text-sm font-medium text-cream transition-transform hover:scale-[1.02] active:scale-95"
      >
        Dërgo mesazhin
      </button>
    </form>
  );
}
