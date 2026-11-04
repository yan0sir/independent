"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/** Adds `is-in` once the element enters the viewport. */
function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Reveal once the top edge passes 90% of the viewport. Anything already
    // scrolled past (e.g. after an anchor jump) is revealed too.
    const check = () => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.9) {
        el.classList.add("is-in");
        stop();
      }
    };
    const stop = () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    check();
    return stop;
  }, []);
  return ref;
}

/** Heading whose lines slide up one after another. */
export function RevealLines({
  lines,
  as: Tag = "h2",
  className = "",
  delay = 0,
}: {
  lines: ReactNode[];
  as?: ElementType;
  className?: string;
  delay?: number;
}) {
  const ref = useInView<HTMLElement>();
  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="reveal-line">
          <span style={{ transitionDelay: `${delay + i * 90}ms` }}>{line}</span>
        </span>
      ))}
    </Tag>
  );
}

export function Reveal({
  children,
  className = "",
  variant = "fade",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  variant?: "fade" | "img";
  delay?: number;
}) {
  const ref = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`${variant === "img" ? "reveal-img" : "reveal-fade"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
