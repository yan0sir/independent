"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { brands, img, type Brand } from "@/content/home";
import { RevealLines, Reveal } from "../Reveal";
import { useReducedMotion } from "@/lib/useReducedMotion";
import Link from "next/link";

function BrandCard({
  brand,
  active,
  onTap,
  hidden,
}: {
  brand: Brand;
  active: boolean;
  onTap: () => void;
  hidden?: boolean;
}) {
  return (
    <li
      aria-hidden={hidden}
      data-active={active || undefined}
      className="brand-card group relative w-[72vw] shrink-0 sm:w-[46vw] md:w-[clamp(260px,24vw,380px)]"
    >
      <Link
        href={`/brands/${brand.slug}`}
        tabIndex={hidden ? -1 : 0}
        onClick={(e) => {
          // Touch: first tap opens details, second follows the link.
          if (window.matchMedia("(hover: none)").matches && !active) {
            e.preventDefault();
            onTap();
          }
        }}
        draggable={false}
        className="block select-none outline-offset-4"
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-card">
          <Image
            src={img(brand.image, 800)}
            alt={`${brand.name}: ${brand.category}`}
            fill
            draggable={false}
            sizes="(min-width: 768px) 24vw, 72vw"
            className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-out)] group-hover:scale-[1.06] group-focus-within:scale-[1.06] group-data-[active]:scale-[1.06]"
          />

          {/* Details panel slides up on hover / focus / tap */}
          <div
            className="absolute inset-x-2 bottom-2 translate-y-[calc(100%+8px)] p-5 transition-transform duration-700 ease-[var(--ease-out)] group-hover:translate-y-0 group-focus-within:translate-y-0 group-data-[active]:translate-y-0"
            style={{ backgroundColor: brand.color }}
          >
            <p className="t-label flex justify-between">
              <span>{brand.type}</span>
              {brand.since && <span>Since {brand.since}</span>}
            </p>
            <p className="mt-6 text-[15px] leading-snug">{brand.line}</p>
            <dl className="t-label mt-5 grid grid-cols-2 gap-3 border-t border-ink/15 pt-3">
              <div>
                <dt className="opacity-60">Category</dt>
                <dd>{brand.category}</dd>
              </div>
              <div>
                <dt className="opacity-60">Markets</dt>
                <dd>{brand.markets || "Coming soon"}</dd>
              </div>
            </dl>
            <p className="t-label mt-5">View brand →</p>
          </div>
        </div>
        <h3 className="t-display mt-3 text-[clamp(1.25rem,1.8vw,1.6rem)]">{brand.name}</h3>
        <p className="t-label mt-1 text-muted">{brand.category}</p>
      </Link>
    </li>
  );
}

export default function BrandCarousel() {
  const trackRef = useRef<HTMLUListElement>(null);
  const reduced = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);

  // Motion state lives in a ref so the ticker can read it every frame.
  const m = useRef({
    x: 0, // current offset in px (always within one loop period)
    speed: 1, // 0..1 multiplier of the auto-scroll speed
    target: 1, // speed eases toward this (0 = stopped on hover/pause)
    inertia: 0, // px/s left over from a fling
    dragging: false,
    lastX: 0,
    lastT: 0,
    moved: 0, // total px dragged; used to cancel the click after a drag
  });

  useEffect(() => {
    const track = trackRef.current;
    if (!track || reduced) return;
    const s = m.current;
    const AUTO = 38; // px per second

    // The track holds the list twice; one period = distance from card 1 to its copy.
    const period = () => {
      const items = track.children;
      const a = items[0] as HTMLElement;
      const b = items[brands.length] as HTMLElement;
      return b.offsetLeft - a.offsetLeft;
    };

    const tick = (_time: number, deltaMs: number) => {
      const dt = Math.min(deltaMs, 64) / 1000;
      if (!s.dragging) {
        s.speed += (s.target - s.speed) * Math.min(1, dt * 3);
        s.x -= AUTO * s.speed * dt;
        s.x += s.inertia * dt;
        s.inertia *= Math.pow(0.04, dt); // fling decays over ~1s
        if (Math.abs(s.inertia) < 2) s.inertia = 0;
      }
      const p = period();
      s.x = ((s.x % p) - p) % p; // wrap into (-p, 0]
      track.style.transform = `translate3d(${s.x}px,0,0)`;
    };

    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      track.style.transform = "";
    };
  }, [reduced]);

  const ease = (to: number) => {
    m.current.target = to;
  };

  // --- Drag / swipe -------------------------------------------------------
  const onPointerDown = (e: React.PointerEvent) => {
    if (reduced || (e.pointerType === "mouse" && e.button !== 0)) return;
    const s = m.current;
    s.dragging = true;
    s.moved = 0;
    s.inertia = 0;
    s.lastX = e.clientX;
    s.lastT = e.timeStamp; // same clock as performance.now()

    const move = (ev: PointerEvent) => {
      const now = performance.now();
      const dx = ev.clientX - s.lastX;
      const dt = Math.max(1, now - s.lastT) / 1000;
      s.x += dx;
      s.moved += Math.abs(dx);
      // Smoothed release velocity
      s.inertia = s.inertia * 0.6 + (dx / dt) * 0.4;
      s.lastX = ev.clientX;
      s.lastT = now;
    };
    const end = () => {
      s.dragging = false;
      // A pause before letting go means no fling.
      if (performance.now() - s.lastT > 80) s.inertia = 0;
      s.inertia = Math.max(-3000, Math.min(3000, s.inertia));
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", end);
      window.removeEventListener("pointercancel", end);
      // Touch has no hover, so resume the loop after the fling.
      if (e.pointerType !== "mouse" && active === null) ease(1);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", end);
    window.addEventListener("pointercancel", end);
  };

  // A drag should never also count as a click on the card underneath.
  const onClickCapture = (e: React.MouseEvent) => {
    if (m.current.moved > 6) {
      e.preventDefault();
      e.stopPropagation();
    }
    m.current.moved = 0;
  };

  const slowDown = () => ease(0);
  const resume = () => {
    if (active === null) ease(1);
  };

  const tap = (i: number) => {
    setActive(i);
    ease(0);
  };

  const list = reduced ? brands : [...brands, ...brands];

  return (
    <section id="brands" className="pt-24 md:pt-40">
      <div className="wrap mb-10 grid gap-6 md:mb-14 md:grid-cols-12 md:items-end">
        <div className="md:col-span-8">
          <RevealLines className="t-display t-l" lines={["Seven brands.", "One way of doing things."]} />
        </div>
        <Reveal className="flex items-center gap-6 md:col-span-4 md:justify-end" delay={200}>
          <Link href="/brands" className="t-label border-b border-ink pb-1">
            All brands →
          </Link>
        </Reveal>
      </div>

      <div
        className={`brands-viewport ${
          reduced
            ? "overflow-x-auto"
            : "cursor-grab touch-pan-y overflow-hidden active:cursor-grabbing"
        }`}
        onPointerDown={onPointerDown}
        onClickCapture={onClickCapture}
        onPointerEnter={(e) => e.pointerType === "mouse" && slowDown()}
        onPointerLeave={(e) => e.pointerType === "mouse" && resume()}
        onFocusCapture={slowDown}
        onBlurCapture={resume}
      >
        <ul
          ref={trackRef}
          className="flex w-max gap-[var(--gutter)] ps-[var(--margin)] pe-[var(--gutter)]"
        >
          {list.map((b, i) => (
            <BrandCard
              key={`${b.slug}-${i}`}
              brand={b}
              hidden={i >= brands.length}
              active={active === i}
              onTap={() => tap(i)}
            />
          ))}
        </ul>
      </div>
      {active !== null && (
        <div className="wrap mt-4 md:hidden">
          <button
            className="t-label text-muted"
            onClick={() => {
              setActive(null);
              ease(1);
            }}
          >
            Close details · resume
          </button>
        </div>
      )}
    </section>
  );
}
