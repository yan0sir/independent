"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import MapView from "./MapView";
import Chips from "./Chips";
import { brands } from "@/content/brands";
import { branchName, countryView, locations, mapsLink, type Country } from "@/content/locations";

type CountryFilter = "all" | Country;

const brandName = (slug: string) => brands.find((b) => b.slug === slug)?.name ?? slug;

/** Filterable branch list + map. Filters live in the URL so views can be shared. */
export default function LocationsExplorer() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const country = (params.get("country") as CountryFilter) || "all";
  const city = params.get("city") || "all";
  const brand = params.get("brand") || "all";

  const [active, setActive] = useState<string | null>(null);
  const [view, setView] = useState<"list" | "map">("list"); // mobile only

  const set = (patch: Record<string, string>) => {
    const next = new URLSearchParams(params.toString());
    Object.entries(patch).forEach(([k, v]) => (v === "all" ? next.delete(k) : next.set(k, v)));
    setActive(null);
    router.replace(`${pathname}${next.size ? `?${next}` : ""}`, { scroll: false });
  };

  const cityOptions = useMemo(
    () => [...new Set(locations.filter((l) => country === "all" || l.country === country).map((l) => l.city))],
    [country],
  );

  const shown = locations.filter(
    (l) =>
      (country === "all" || l.country === country) &&
      (city === "all" || l.city === city) &&
      (brand === "all" || l.brand === brand),
  );

  const points = useMemo(
    () =>
      shown.map((l) => ({ id: l.id, lat: l.lat, lng: l.lng, title: `${branchName(brandName(l.brand), l)}, ${l.city}` })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [country, city, brand],
  );

  return (
    <section className="wrap pb-24 md:pb-40">
      {/* Filters */}
      <div className="flex flex-col gap-4 border-t border-line pt-6 lg:flex-row lg:items-center lg:justify-between">
        <Chips
          label="Country"
          value={country}
          onChange={(v) => set({ country: v, city: "all" })}
          options={[
            { value: "all", label: "All countries" },
            { value: "UAE", label: "UAE" },
            { value: "Saudi Arabia", label: "KSA" },
            { value: "Qatar", label: "Qatar" },
            { value: "Bahrain", label: "Bahrain" },
            { value: "United Kingdom", label: "UK" },
          ]}
        />
        <div className="flex flex-wrap gap-3">
          <label className="sr-only" htmlFor="f-city">City</label>
          <select id="f-city" className="field w-auto py-2.5" value={city} onChange={(e) => set({ city: e.target.value })}>
            <option value="all">All cities</option>
            {cityOptions.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <label className="sr-only" htmlFor="f-brand">Brand</label>
          <select id="f-brand" className="field w-auto py-2.5" value={brand} onChange={(e) => set({ brand: e.target.value })}>
            <option value="all">All brands</option>
            {brands.filter((b) => b.branches > 0).map((b) => (
              <option key={b.slug} value={b.slug}>
                {b.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <p className="t-label text-muted" aria-live="polite">
          {shown.length} {shown.length === 1 ? "branch" : "branches"}
        </p>
        <div className="flex gap-4 md:hidden">
          {(["list", "map"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`t-label ${view === v ? "border-b border-ink" : "text-muted"}`}
            >
              {v === "list" ? "List" : "Map"}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 grid gap-[var(--gutter)] md:grid-cols-12">
        {/* List */}
        <div className={`md:col-span-5 ${view === "map" ? "hidden md:block" : ""}`}>
          <ul className="border-t border-line md:max-h-[70vh] md:overflow-y-auto" data-lenis-prevent>
            {shown.map((l) => (
              <li key={l.id} className="flex items-center gap-4 border-b border-line">
                <button
                  onClick={() => setActive(l.id)}
                  aria-pressed={active === l.id}
                  className={`grid flex-1 grid-cols-[1fr_auto] items-baseline gap-x-4 py-3.5 text-start transition-colors ${
                    active === l.id ? "text-ink" : "text-ink/85 hover:text-ink"
                  }`}
                >
                  <span className="text-[17px] font-medium">{brandName(l.brand)}</span>
                  <span className="t-label text-muted">{l.city}</span>
                  <span className="text-[15px] text-muted">{l.area}</span>
                </button>
                <a
                  href={mapsLink(l)}
                  target="_blank"
                  rel="noreferrer"
                  className="t-label shrink-0 text-muted hover:text-ink"
                  aria-label={`Directions to ${branchName(brandName(l.brand), l)}`}
                >
                  ↗
                </a>
              </li>
            ))}
            {shown.length === 0 && (
              <li className="py-10 text-lg text-muted">
                {country !== "all" && !locations.some((l) => l.country === country)
                  ? `Branches in ${country === "United Kingdom" ? "the UK" : country} are coming soon.`
                  : "No branches match these filters yet."}
              </li>
            )}
          </ul>
        </div>

        {/* Map */}
        <div className={`md:col-span-7 ${view === "list" ? "hidden md:block" : ""}`}>
          <div className="md:sticky md:top-24">
            <MapView
              className="h-[70vh] min-h-[420px]"
              points={points}
              emptyView={country !== "all" ? countryView[country] : undefined}
              activeId={active}
              onSelect={setActive}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
