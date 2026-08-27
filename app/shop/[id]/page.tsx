import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GARMENTS } from "@/lib/garments";
import { DESCRIPTIONS } from "@/lib/descriptions";
import { products } from "@/data/products";
import ProductActions from "@/components/ProductActions";
import ProductCard from "@/components/ProductCard";
import Image from "next/image";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((p) => p.id === id);
  if (!product) return { title: "Produkti — BELLA" };
  return {
    title: `${product.name} — BELLA`,
    description: DESCRIPTIONS[product.category],
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);
  if (!product) notFound();

  const Garment = GARMENTS[product.garment];
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <nav className="mb-8 flex items-center gap-2 text-sm text-ink-soft">
        <Link href="/shop" className="hover:text-ink">
          Dyqani
        </Link>
        <span>/</span>
        <Link
          href={`/shop?category=${encodeURIComponent(product.category)}`}
          className="hover:text-ink"
        >
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="grid gap-12 lg:grid-cols-2">
        <div className="drift-in relative flex h-[26rem] items-center justify-center overflow-hidden rounded-[2rem] bg-cream-dim sm:h-[32rem]">
          <div
            aria-hidden
            className="absolute h-64 w-64 rounded-full bg-ink/5 blur-3xl"
          />
          {product.isNew && (
            <span className="absolute left-6 top-6 rounded-full bg-rust px-3 py-1 text-xs font-semibold tracking-wide text-cream">
              E RE
            </span>
          )}
          {/* <Garment
            className={`relative h-72 w-auto drop-shadow-[0_24px_30px_rgba(32,26,21,0.2)] sm:h-96 ${product.color}`}
          /> */}
          <Image
            src={product.image}
            alt=""
            width={160}
            height={160}
            draggable={false}
            className={`relative h-72 w-auto drop-shadow-[0_24px_30px_rgba(32,26,21,0.2)] sm:h-96 ${product.color}`}
          />
        </div>

        <div className="drift-in" style={{ animationDelay: "0.08s" }}>
          <p className="text-xs font-semibold tracking-[0.3em] text-rust">
            {product.category.toUpperCase()}
          </p>
          <h1 className="mt-3 font-display text-4xl text-ink sm:text-5xl">
            {product.name}
          </h1>
          <p className="mt-3 text-2xl font-semibold text-ink">
            ${product.price}
          </p>
          <p className="mt-6 max-w-md text-ink-soft leading-relaxed">
            {DESCRIPTIONS[product.category]}
          </p>

          <div className="mt-8">
            <ProductActions />
          </div>

          <dl className="mt-10 grid max-w-md grid-cols-2 gap-y-3 border-t border-ink/10 pt-6 text-sm">
            <dt className="text-ink-soft">Përshtatja</dt>
            <dd className="text-ink">Madhësi standarde</dd>
            <dt className="text-ink-soft">Kujdesi</dt>
            <dd className="text-ink">Larje me makinë në ujë të ftohtë</dd>
            <dt className="text-ink-soft">Transporti</dt>
            <dd className="text-ink">Falas mbi $75</dd>
          </dl>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-24">
          <h2 className="font-display text-2xl text-ink sm:text-3xl">
            Mund të të pëlqejnë edhe këto
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
