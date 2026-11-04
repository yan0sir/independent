"use client";

import { useEffect, useRef, useState } from "react";
import { numbers } from "@/content/home";

function CountUp({ to, run }: { to: number; run: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    const start = performance.now();
    const dur = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 1 : 1600;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.round(to * (1 - Math.pow(1 - p, 4))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, to]);
  return <>{n}</>;
}

export default function Numbers() {
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setRun(true), {
      threshold: 0.4,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section aria-label="Independent in numbers" className="wrap pt-24 md:pt-36">
      <div ref={ref} className="grid grid-cols-2 border-t border-line md:grid-cols-4">
        {numbers.map((item, i) => (
          <div
            key={item.label}
            className={`border-line py-6 pe-4 md:py-8 ${i < 2 ? "border-b md:border-b-0" : ""} ${
              i % 2 === 1 ? "border-s ps-4" : ""
            } ${i > 0 ? "md:border-s md:ps-6" : ""}`}
          >
            <p className="t-display text-[clamp(3.5rem,8vw,7.5rem)] leading-none">
              <CountUp to={item.value} run={run} />
              {item.suffix}
            </p>
            <p className="t-label mt-3 text-muted">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
