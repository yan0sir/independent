import Image from "next/image";
import Link from "next/link";
import { img, moments, type Moment } from "@/content/home";
import { brands } from "@/content/brands";
import { Reveal, RevealLines } from "../Reveal";

function MomentCard({ m, i }: { m: Moment; i: number }) {
  const meta = (
    <p className="t-label flex justify-between gap-4 text-muted">
      <span>
        {m.kind}
        {m.brand && ` · ${m.brand}`}
      </span>
      <span>{m.date}</span>
    </p>
  );

  const brand = brands.find((b) => b.name === m.brand);
  const href = brand ? `/brands/${brand.slug}` : "/about";

  return (
    <Reveal className="mb-[var(--gutter)] break-inside-avoid" delay={(i % 4) * 80}>
      <Link href={href} className="group block">
        {m.quote ? (
          <div className="flex aspect-[4/5] flex-col justify-between bg-ink p-6 text-inverse transition-colors duration-500 group-hover:bg-[#2a2a2a]">
            <p className="t-label opacity-60">
              {m.kind} · {m.date}
            </p>
            <p className="t-display text-[clamp(1.75rem,2.6vw,2.5rem)] leading-[0.95]">{m.quote}</p>
            <p className="text-[15px] opacity-80">{m.line}</p>
          </div>
        ) : (
          <div className="relative overflow-hidden bg-card" style={{ aspectRatio: m.ratio ?? "4/5" }}>
            <Image
              src={img(m.image!, 900)}
              alt={m.title}
              fill
              sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-out)] group-hover:scale-[1.04]"
            />
          </div>
        )}
        {!m.quote && (
          <div className="pt-3">
            {meta}
            <h3 className="mt-2 text-[17px] font-medium leading-snug">
              <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">
                {m.title}
              </span>
            </h3>
            <p className="mt-1 text-[15px] leading-snug text-muted">{m.line}</p>
          </div>
        )}
      </Link>
    </Reveal>
  );
}

export default function Moments() {
  return (
    <section id="moments" className="wrap pt-28 md:pt-48">
      <div className="mb-10 grid gap-6 md:mb-14 md:grid-cols-12 md:items-end">
        <div className="md:col-span-8">
          <RevealLines className="t-display t-l" lines={["Openings, plates,", "pop-ups & press."]} />
        </div>
        <Reveal className="md:col-span-4 md:text-end" delay={200}>
          <p className="max-w-sm text-[15px] leading-snug text-muted md:ms-auto">
            What&apos;s been happening across our brands lately.
          </p>
        </Reveal>
      </div>

      <div className="columns-1 gap-[var(--gutter)] sm:columns-2 md:columns-3 xl:columns-4">
        {moments.map((m, i) => (
          <MomentCard key={m.title} m={m} i={i} />
        ))}
      </div>
    </section>
  );
}
