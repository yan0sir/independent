"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { heroImages, img } from "@/content/home";

/** Crossfading photo montage. Stands in for the hero video loop (brief §4). */
export default function Hero() {
  const [active, setActive] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t0 = setTimeout(() => setLoaded(true), 60);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setActive((i) => (i + 1) % heroImages.length), 5000);
    return () => {
      clearTimeout(t0);
      clearInterval(t);
    };
  }, []);

  return (
    <section data-hero className={`relative h-[100svh] min-h-[600px] overflow-hidden bg-ink text-inverse ${loaded ? "is-in" : ""}`}>
      {heroImages.map((id, i) => (
        <Image
          key={id}
          src={img(id, 2200)}
          alt=""
          fill
          priority={i === 0}
          sizes="100vw"
          className={`object-cover transition-[opacity,transform] duration-[2400ms] ease-out ${
            i === active ? "scale-100 opacity-100" : "scale-[1.06] opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/10 to-black/65" />

      <div className="wrap relative flex h-full flex-col justify-end pb-10 md:pb-14">
        <h1 className="t-display t-xl max-w-[14ch]">
          {["It started", "with a trailer", "on a beach."].map((line, i) => (
            <span key={i} className="reveal-line">
              <span style={{ transitionDelay: `${200 + i * 110}ms` }}>{line}</span>
            </span>
          ))}
        </h1>

        <div
          className="reveal-fade mt-8 flex flex-col gap-6 border-t border-inverse/30 pt-5 md:mt-12 md:flex-row md:items-end md:justify-between"
          style={{ transitionDelay: "650ms" }}
        >
          <p className="max-w-md text-lg leading-snug md:text-xl">
            Now it&apos;s 40+ places people queue for, across seven brands we built
            and run in the Gulf.
          </p>
          <div className="flex gap-1.5" aria-hidden>
            {heroImages.map((id, i) => (
              <span
                key={id}
                className={`h-px w-8 transition-colors duration-700 ${
                  i === active ? "bg-inverse" : "bg-inverse/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
