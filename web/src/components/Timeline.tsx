"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { timeline } from "@/content/company";
import { img } from "@/content/home";

/**
 * Vertical scroll story (no pinning, no horizontal scroll):
 * - desktop: a sticky panel with a crossfading photo and a rolling year,
 *   next to the milestone list with a progress line that fills as you scroll
 * - mobile: a single column with each milestone's photo inline
 * Every milestone stays in the DOM in reading order; inactive ones use the
 * muted ink color (still AA contrast) rather than being faded out.
 */
export default function Timeline() {
  const listRef = useRef<HTMLOListElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const items = [...list.querySelectorAll<HTMLElement>("[data-step]")];

    const update = () => {
      const mid = window.innerHeight * 0.5;
      // Active = last milestone whose top has passed the middle of the screen.
      let current = 0;
      items.forEach((el, i) => {
        if (el.getBoundingClientRect().top < mid) current = i;
      });
      setActive(current);

      // Progress line: how far the middle of the screen is through the list.
      const r = list.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (mid - r.top) / r.height));
      if (lineRef.current) lineRef.current.style.transform = `scaleY(${p})`;
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="grid gap-[var(--gutter)] md:grid-cols-12">
      {/* Sticky panel (desktop) */}
      <div className="hidden md:col-span-5 md:block">
        <div className="sticky top-24">
          {/* Height follows the screen so the year below always stays in view */}
          <div className="relative h-[min(56vh,640px)] overflow-hidden bg-card">
            {timeline.map((t, i) => (
              <Image
                key={t.year}
                src={img(t.image, 1200)}
                alt=""
                fill
                sizes="40vw"
                className={`object-cover transition-[opacity,transform] duration-[900ms] ease-[var(--ease-out)] motion-reduce:transition-none ${
                  i === active ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"
                }`}
              />
            ))}
          </div>
          <div className="mt-6 flex items-end justify-between gap-6">
            {/* Rolling year: each year sits above/below and slides into place */}
            <div
              className="relative h-[clamp(4rem,7vw,6.5rem)] flex-1 overflow-hidden"
              aria-live="polite"
              aria-atomic="true"
            >
              {timeline.map((t, i) => (
                <span
                  key={t.year}
                  aria-hidden={i !== active}
                  className={`t-display absolute inset-x-0 top-0 block text-[clamp(4rem,7vw,6.5rem)] leading-none transition-transform duration-700 ease-[var(--ease-out)] motion-reduce:transition-none ${
                    i === active ? "translate-y-0" : i < active ? "-translate-y-full" : "translate-y-full"
                  }`}
                >
                  {i === active ? <span className="sr-only">Now showing </span> : null}
                  {t.year}
                </span>
              ))}
            </div>
            <p className="t-label pb-2 text-muted tabular-nums">
              {pad(active + 1)} / {pad(timeline.length)}
            </p>
          </div>
        </div>
      </div>

      {/* Milestones */}
      <ol ref={listRef} className="relative md:col-span-6 md:col-start-7">
        {/* Progress line */}
        <div aria-hidden className="absolute bottom-0 left-[5px] top-0 w-px bg-line">
          <div
            ref={lineRef}
            className="h-full w-full origin-top bg-ink"
            style={{ transform: "scaleY(0)" }}
          />
        </div>

        {timeline.map((t, i) => {
          const on = i === active;
          const passed = i <= active;
          return (
            <li
              key={t.year}
              data-step
              aria-current={on ? "step" : undefined}
              className="relative flex flex-col justify-center py-10 ps-10 md:min-h-[42vh] md:py-14"
            >
              {/* Marker on the line */}
              <span
                aria-hidden
                className={`absolute left-0 top-[3.1rem] size-[11px] rounded-full border transition-colors duration-500 md:top-1/2 md:-translate-y-1/2 ${
                  passed ? "border-ink bg-ink" : "border-ink/30 bg-paper"
                }`}
              />
              <p className={`t-label transition-colors duration-500 ${on ? "text-ink" : "text-muted"}`}>
                {t.year}
              </p>
              <h3
                className={`t-display mt-3 text-[clamp(1.75rem,3.2vw,3rem)] transition-colors duration-500 ${
                  on ? "text-ink" : "text-muted"
                }`}
              >
                {t.title}
              </h3>
              <p className="mt-3 max-w-md text-[17px] leading-relaxed text-muted">{t.line}</p>

              {/* Inline photo on mobile */}
              <div className="relative mt-6 aspect-[4/3] overflow-hidden bg-card md:hidden">
                <Image src={img(t.image, 900)} alt="" fill sizes="90vw" className="object-cover" />
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
