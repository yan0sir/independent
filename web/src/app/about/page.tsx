import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import Numbers from "@/components/sections/Numbers";
import Timeline from "@/components/Timeline";
import { Reveal, RevealLines } from "@/components/Reveal";
import { principles } from "@/content/company";
import { img } from "@/content/home";

export const metadata: Metadata = {
  title: "About — Independent",
  description:
    "The Independent Food Company: a hospitality collective building food brands across the UAE, KSA and beyond.",
};

const teasers = [
  {
    href: "/leadership",
    title: "Leadership",
    line: "The people steering the group.",
    image: "1528605248644-14dd04022da1",
  },
  {
    href: "/careers",
    title: "Careers",
    line: "Join the teams behind the counter and the kitchen.",
    image: "1554118811-1e0d58224f24",
  },
];

export default function AboutPage() {
  return (
    <main>
      <PageIntro
        lines={["A house of", "imagination."]}
        intro="We are the Independent Food Company: a hospitality collective that keeps reinventing local culture through food, creators and brands."
      />

      {/* Origin */}
      <section className="wrap">
        <Reveal variant="img" className="relative aspect-[16/9] overflow-hidden bg-card md:aspect-[21/9]">
          <Image
            src={img("1529042410759-befb1204b468", 2400)}
            alt="Placeholder: SALT's original Airstream trailer on Kite Beach"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </Reveal>
        <div className="mt-12 grid gap-10 md:mt-20 md:grid-cols-12 md:gap-[var(--gutter)]">
          <RevealLines
            className="t-display t-l md:col-span-6"
            lines={["It started with", "a trailer on", "a beach."]}
          />
          <div className="space-y-5 text-lg leading-relaxed md:col-span-5 md:col-start-8">
            <Reveal>
              <p>
                In 2014, SALT started serving from an Airstream trailer on Dubai&apos;s
                Kite Beach. It was never just about a food truck. It was about doing
                simple things in the greatest way, and creating a sense of
                unpredictability that kept people coming back.
              </p>
            </Reveal>
            <Reveal delay={100}>
              <p className="text-muted">
                That energy became Independent: the originator of SALT, Public,
                Parker&apos;s, Somewhere, Shalwa and Kumo, and the exclusive franchisee
                of Joe &amp; The Juice in Saudi Arabia. Today we run 40+ branches
                across the UAE, KSA and Qatar, built over more than 15 years in food and
                beverage.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="pt-24 md:pt-40">
        <div className="wrap">
          <RevealLines className="t-display t-l mb-10 md:mb-14" lines={["How we got here."]} />
          <Timeline />
        </div>
      </section>

      {/* Principles */}
      <section className="wrap pt-24 md:pt-40">
        <RevealLines className="t-display t-l mb-10 md:mb-14" lines={["The Independent way."]} />
        <div className="grid gap-x-[var(--gutter)] sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={i * 80} className="border-t border-ink py-6">
              <p className="t-display text-[clamp(1.6rem,2.4vw,2.2rem)]">{p.title}</p>
              <p className="mt-3 text-[15px] leading-snug text-muted">{p.line}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <Numbers />

      {/* Teasers */}
      <section className="wrap pb-24 pt-24 md:pb-40 md:pt-40">
        <div className="grid gap-[var(--gutter)] md:grid-cols-2">
          {teasers.map((t) => (
            <Link key={t.href} href={t.href} className="group block">
              <div className="relative aspect-[4/3] overflow-hidden bg-card">
                <Image
                  src={img(t.image, 1400)}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-out)] group-hover:scale-[1.04]"
                />
              </div>
              <div className="mt-4 flex items-end justify-between gap-6">
                <div>
                  <p className="t-display t-m">{t.title}</p>
                  <p className="mt-1 text-[15px] text-muted">{t.line}</p>
                </div>
                <span
                  aria-hidden
                  className="grid size-11 shrink-0 place-items-center rounded-full border border-ink/20 transition-colors duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-paper"
                >
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
