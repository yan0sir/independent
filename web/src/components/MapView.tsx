"use client";

import { useEffect, useRef } from "react";
import type { Map as MLMap, Marker } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

export type MapPoint = { id: string; lat: number; lng: number; title: string };

// Free, keyless vector tiles (OpenFreeMap). Swap for a custom cream/black style later.
const STYLE = "https://tiles.openfreemap.org/styles/positron";

/** Map with one dot per point; fits to the points whenever they change. */
export default function MapView({
  points,
  activeId,
  onSelect,
  className = "",
  emptyView,
}: {
  points: MapPoint[];
  /** Where to look when there are no points (e.g. a country with no branches yet). */
  emptyView?: { lng: number; lat: number; zoom: number };
  activeId?: string | null;
  onSelect?: (id: string) => void;
  className?: string;
}) {
  const box = useRef<HTMLDivElement>(null);
  const map = useRef<MLMap | null>(null);
  const markers = useRef(new Map<string, Marker>());
  const lib = useRef<typeof import("maplibre-gl") | null>(null);
  const onSelectRef = useRef(onSelect);

  useEffect(() => {
    onSelectRef.current = onSelect;
  }, [onSelect]);

  // Create the map once.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const maplibre = await import("maplibre-gl");
      if (cancelled || !box.current) return;
      // The bundler can't resolve MapLibre's worker, so serve a copy from /public
      // (kept in sync by the postinstall script).
      if (!maplibre.getWorkerUrl()?.startsWith("/maplibre/")) {
        maplibre.setWorkerUrl("/maplibre/maplibre-gl-worker.mjs");
      }
      lib.current = maplibre;
      map.current = new maplibre.Map({
        container: box.current,
        style: STYLE,
        center: [50, 24],
        zoom: 4,
        attributionControl: { compact: true },
        cooperativeGestures: true, // don't hijack page scroll
      });
      map.current.addControl(new maplibre.NavigationControl({ showCompass: false }), "top-right");
      // Markers are plain DOM, so they can go on before the tiles finish loading.
      box.current.dispatchEvent(new Event("map-ready"));
    })();
    const current = markers.current;
    return () => {
      cancelled = true;
      current.forEach((m) => m.remove());
      current.clear();
      map.current?.remove();
      map.current = null;
    };
  }, []);

  // Sync markers + bounds with the points.
  useEffect(() => {
    const sync = () => {
      const m = map.current;
      const maplibre = lib.current;
      if (!m || !maplibre) return;
      const keep = new Set(points.map((p) => p.id));
      markers.current.forEach((mk, id) => {
        if (!keep.has(id)) {
          mk.remove();
          markers.current.delete(id);
        }
      });
      points.forEach((p) => {
        if (markers.current.has(p.id)) return;
        const el = document.createElement("button");
        el.type = "button";
        el.className = "map-dot";
        el.title = p.title;
        el.setAttribute("aria-label", p.title);
        el.addEventListener("click", () => onSelectRef.current?.(p.id));
        markers.current.set(p.id, new maplibre.Marker({ element: el }).setLngLat([p.lng, p.lat]).addTo(m));
      });
      if (!points.length && emptyView) {
        m.flyTo({ center: [emptyView.lng, emptyView.lat], zoom: emptyView.zoom, duration: 900 });
      }
      if (points.length) {
        const b = new maplibre.LngLatBounds();
        points.forEach((p) => b.extend([p.lng, p.lat]));
        m.fitBounds(b, { padding: 60, maxZoom: 12, duration: 900 });
      }
    };
    if (map.current) sync();
    const el = box.current;
    el?.addEventListener("map-ready", sync);
    return () => el?.removeEventListener("map-ready", sync);
  }, [points, emptyView]);

  // Highlight the active marker and fly to it.
  useEffect(() => {
    markers.current.forEach((mk, id) => mk.getElement().classList.toggle("is-active", id === activeId));
    const p = points.find((x) => x.id === activeId);
    if (p && map.current) map.current.flyTo({ center: [p.lng, p.lat], zoom: 13, duration: 900 });
  }, [activeId, points]);

  return <div ref={box} className={`bg-card ${className}`} />;
}
