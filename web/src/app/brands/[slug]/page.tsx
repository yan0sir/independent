import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { brands, getBrand } from "@/content/brands";
import { locations } from "@/content/locations";
import { img } from "@/content/home";
import { Reveal, RevealLines } from "@/components/Reveal";
import Gallery from "@/components/Gallery";
import BrandLocations from "@/components/BrandLocations";

export function generateStaticParams() {
  return brands.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const b = getBrand(slug);
  if (!b) return {};
  return { title: `${b.name} — Independent`, description: `${b.name}: ${b.line}` };
}

/** Shell renders instantly; the brand content (which reads the URL) streams in. */
export default function BrandPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<main><section data-hero className="h-[88svh] min-h-[560px] bg-ink" /></main>}>
      <BrandContent params={params} />
    </Suspense>
  );
}

async function BrandContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const brand = getBrand(slug);
  if (!brand) notFound();

  const idx = brands.findIndex((b) => b.slug === slug);
  const next = brands[(idx + 1) % brands.length];
  const own = locations.filter((l) => l.brand === slug);

  const facts = [
    { k: "Type", v: brand.type },
    { k: "Category", v: brand.category },
    ...(brand.since ? [{ k: "Since", v: brand.since }] : []),
    ...(brand.branches > 0
      ? [
          { k: "Branches", v: String(brand.branches) },
          { k: "Markets", v: brand.markets },
        ]
      : [{ k: "Locations", v: "Coming soon" }]),
  ];

  return (
    <main>
      {/* Hero */}
      <section data-hero className="is-in relative h-[88svh] min-h-[560px] overflow-hidden bg-ink text-inverse">
        <Image
          src={img(brand.image, 2200)}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/5 to-black/65" />
        <div className="wrap relative flex h-full flex-col justify-end pb-10 md:pb-14">
          <h1 className="t-display text-[clamp(4rem,14vw,13rem)] leading-[0.85]">
            <span className="reveal-line">
              <span style={{ transitionDelay: "150ms" }}>{brand.name}</span>
            </span>
          </h1>
          <p
            className="reveal-fade mt-6 max-w-md text-lg leading-snug md:text-xl"
            style={{ transitionDelay: "450ms" }}
          >
            {brand.line}
          </p>
        </div>
      </section>

      {/* Facts */}
      <section className="wrap">
        <dl className="grid grid-cols-2 border-b border-line md:grid-cols-5">
          {facts.map((f) => (
            <div key={f.k} className="border-line py-5 pe-4 md:border-e md:last:border-e-0 md:[&:not(:first-child)]:ps-5">
              <dt className="t-label text-muted">{f.k}</dt>
              <dd className="mt-1 text-[17px]">{f.v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Story */}
      <section className="wrap pt-24 md:pt-36">
        <div className="grid gap-10 md:grid-cols-12 md:gap-[var(--gutter)]">
          <RevealLines className="t-display t-l md:col-span-6" lines={[`About ${brand.name}`]} />
          <div className="space-y-5 text-lg leading-relaxed md:col-span-5 md:col-start-8">
            {brand.story.map((p, i) => (
              <Reveal key={i} delay={i * 100}>
                <p className={i > 0 ? "text-muted" : ""}>{p}</p>
              </Reveal>
            ))}
            <Reveal delay={250} className="flex flex-wrap gap-x-6 gap-y-2 pt-2">
              {brand.links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="t-label border-b border-ink pb-1"
                >
                  {l.label} ↗
                </a>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="wrap pt-24 md:pt-36">
        <Gallery items={brand.gallery} />
      </section>

      {/* Locations */}
      <section className="wrap pt-24 md:pt-36">
        {own.length > 0 ? (
          <>
            <div className="mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
              <RevealLines
                className="t-display t-l"
                lines={[`Find ${brand.name}`, `in ${own.length} ${own.length === 1 ? "place" : "places"}.`]}
              />
              <Link href={`/locations?brand=${brand.slug}`} className="t-label border-b border-ink pb-1 md:mb-2">
                All locations →
              </Link>
            </div>
            <BrandLocations items={own} />
          </>
        ) : (
          <div className="flex flex-col gap-4 border-t border-line pt-8 md:flex-row md:items-end md:justify-between">
            <RevealLines className="t-display t-l" lines={[`${brand.name} locations`, "coming soon."]} />
            <Link href="/locations" className="t-label border-b border-ink pb-1 md:mb-2">
              See all locations →
            </Link>
          </div>
        )}
      </section>

      {/* Partner CTA */}
      <section className="wrap pt-24 md:pt-36">
        <div
          className="flex flex-col gap-8 p-8 md:flex-row md:items-end md:justify-between md:p-14"
          style={{ backgroundColor: brand.color }}
        >
          <RevealLines
            className="t-display t-l"
            lines={[`Bring ${brand.name}`, "to your space."]}
          />
          <Link
            href={`/contact?topic=partnership&brand=${brand.slug}`}
            className="t-label shrink-0 self-start rounded-full bg-ink px-6 py-4 text-paper md:self-auto"
          >
            Start a conversation →
          </Link>
        </div>
      </section>

      {/* Next brand */}
      <section className="wrap pb-24 pt-24 md:pb-40 md:pt-36">
        <Link href={`/brands/${next.slug}`} className="group grid items-end gap-6 border-t border-line pt-6 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="t-label text-muted">Next brand</p>
            <p className="t-display t-xl mt-3 transition-transform duration-500 ease-[var(--ease-out)] group-hover:translate-x-3">
              {next.name} →
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden bg-card md:col-span-4">
            <Image
              src={img(next.image, 900)}
              alt=""
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-out)] group-hover:scale-[1.05]"
            />
          </div>
        </Link>
      </section>
    </main>
  );
}
