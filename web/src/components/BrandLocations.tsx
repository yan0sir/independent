"use client";

import { useState } from "react";
import MapView from "./MapView";
import { mapsLink, type Location } from "@/content/locations";

/** Branch list + map for a single brand. */
export default function BrandLocations({ items }: { items: Location[] }) {
  const [active, setActive] = useState<string | null>(null);
  const cities = [...new Set(items.map((l) => l.city))];

  return (
    <div className="grid gap-8 md:grid-cols-12 md:gap-[var(--gutter)]">
      <div className="md:col-span-5">
        {cities.map((city) => (
          <div key={city} className="mb-8">
            <p className="t-label mb-2 text-muted">{city}</p>
            <ul className="border-t border-line">
              {items
                .filter((l) => l.city === city)
                .map((l) => (
                  <li
                    key={l.id}
                    className="flex items-center justify-between gap-4 border-b border-line"
                  >
                    <button
                      onClick={() => setActive(l.id)}
                      aria-pressed={active === l.id}
                      className={`flex-1 py-3 text-start text-[17px] transition-colors hover:text-ink ${
                        active === l.id ? "text-ink underline underline-offset-4" : "text-ink/80"
                      }`}
                    >
                      {l.area}
                    </button>
                    <a
                      href={mapsLink(l)}
                      target="_blank"
                      rel="noreferrer"
                      className="t-label text-muted hover:text-ink"
                    >
                      Directions ↗
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
      <MapView
        className="aspect-[4/3] md:col-span-7 md:aspect-auto md:min-h-[480px]"
        points={items.map((l) => ({ id: l.id, lat: l.lat, lng: l.lng, title: `${l.area}, ${l.city}` }))}
        activeId={active}
        onSelect={setActive}
      />
    </div>
  );
}
