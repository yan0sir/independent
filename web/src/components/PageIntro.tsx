import type { ReactNode } from "react";
import { Reveal, RevealLines } from "./Reveal";

/** Standard top-of-page block for inner pages: big title + short intro. */
export default function PageIntro({
  lines,
  intro,
  aside,
}: {
  lines: string[];
  intro?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="wrap pb-14 pt-36 md:pb-20 md:pt-48">
      <div className="grid gap-8 md:grid-cols-12 md:items-end md:gap-[var(--gutter)]">
        <RevealLines as="h1" className="t-display t-xl md:col-span-8" lines={lines} />
        {(intro || aside) && (
          <Reveal className="md:col-span-4" delay={250}>
            {intro && <p className="max-w-md text-lg leading-snug text-muted">{intro}</p>}
            {aside}
          </Reveal>
        )}
      </div>
    </section>
  );
}
