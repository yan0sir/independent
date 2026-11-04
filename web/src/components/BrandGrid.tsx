"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Chips from "./Chips";
import { img } from "@/content/home";
import type { BrandWithStats } from "@/content/brands";

type Filter = "all" | "Home-grown" | "Franchise" | "UAE" | "Saudi Arabia" | "Qatar";

const options: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "Home-grown", label: "Home-grown" },
  { value: "Franchise", label: "Franchise" },
  { value: "UAE", label: "UAE" },
  { value: "Saudi Arabia", label: "KSA" },
  { value: "Qatar", label: "Qatar" },
];

/** Keypass-style uniform 4:5 grid with filters. */
export default function BrandGrid({ brands }: { brands: BrandWithStats[] }) {
  const [filter, setFilter] = useState<Filter>("all");

  const shown = brands.filter((b) => {
    if (filter === "all") return true;
    if (filter === "Home-grown" || filter === "Franchise") return b.type === filter;
    return b.countries.includes(filter);
  });

  return (
    <section className="wrap">
      <div className="mb-8 flex flex-col gap-4 border-t border-line pt-6 md:flex-row md:items-center md:justify-between">
        <Chips label="Filter brands" options={options} value={filter} onChange={setFilter} />
        <p className="t-label text-muted" aria-live="polite">
          {shown.length} {shown.length === 1 ? "brand" : "brands"}
        </p>
      </div>

      <ul className="grid grid-cols-1 gap-x-[var(--gutter)] gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {shown.map((b) => (
          <li key={b.slug}>
            <Link href={`/brands/${b.slug}`} className="group block">
              <div className="relative aspect-[4/5] overflow-hidden bg-card">
                <Image
                  src={img(b.image, 900)}
                  alt={`${b.name}: ${b.category}`}
                  fill
                  sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-opacity duration-700 group-hover:opacity-0"
                />
                <Image
                  src={img(b.image2, 900)}
                  alt=""
                  fill
                  sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="scale-105 object-cover opacity-0 transition-[opacity,transform] duration-700 group-hover:scale-100 group-hover:opacity-100"
                />
              </div>
              <div
                // Same padding at rest and on hover, so the grid never shifts; only the tint fades in.
                className="p-3 transition-colors duration-500 group-hover:bg-[var(--tint)]"
                style={{ "--tint": b.color } as React.CSSProperties}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h2 className="t-display text-[clamp(1.4rem,2vw,1.8rem)]">{b.name}</h2>
                  <span className="t-label text-muted">{b.type}</span>
                </div>
                <p className="mt-1 text-[15px] text-muted">{b.category}</p>
                <p className="t-label mt-1 text-muted">
                  {b.branches > 0 ? `${b.branches} branches · ${b.markets}` : "Locations coming soon"}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
