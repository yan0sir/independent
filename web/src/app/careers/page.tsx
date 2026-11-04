import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import { Reveal, RevealLines } from "@/components/Reveal";
import { jobs } from "@/content/company";
import { img } from "@/content/home";

export const metadata: Metadata = {
  title: "Careers — Independent",
  description: "Join the teams behind SALT, Somewhere, Public, Parker's, Shalwa, Kumo and Joe & The Juice KSA.",
};

const photos = [
  { id: "1528605248644-14dd04022da1", ratio: "aspect-[4/5]" },
  { id: "1551218808-94e220e084d2", ratio: "aspect-[4/5] md:mt-16" },
  { id: "1501339847302-ac426a4a7cbb", ratio: "aspect-[4/5]" },
];

const apply = (role?: string) =>
  `/contact?topic=careers${role ? `&role=${encodeURIComponent(role)}` : ""}`;

export default function CareersPage() {
  return (
    <main className="pb-24 md:pb-40">
      <PageIntro
        lines={["Come build", "with us."]}
        intro="From the kitchen to the head office, we look for people who care about the small things and like to keep things moving."
      />

      <section className="wrap">
        <div className="grid grid-cols-3 gap-[var(--gutter)]">
          {photos.map((p, i) => (
            <Reveal key={p.id} variant="img" delay={i * 100} className={`relative overflow-hidden bg-card ${p.ratio}`}>
              <Image src={img(p.id, 900)} alt="" fill sizes="33vw" className="object-cover" />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="wrap pt-24 md:pt-36">
        <div className="mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
          <RevealLines className="t-display t-l" lines={["Open roles."]} />
          <p className="t-label text-muted">{jobs.length} open positions</p>
        </div>

        <ul className="border-t border-line">
          {jobs.map((j, i) => (
            <li key={j.title + j.city}>
              <Reveal delay={i * 50}>
                <Link
                  href={apply(j.title)}
                  className="group grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-1 border-b border-line py-5 md:grid-cols-12"
                >
                  <span className="t-display text-[clamp(1.25rem,2vw,1.75rem)] transition-transform duration-500 ease-[var(--ease-out)] group-hover:translate-x-2 md:col-span-5">
                    {j.title}
                  </span>
                  <span className="col-start-1 text-[15px] text-muted md:col-span-2 md:col-start-auto">{j.brand}</span>
                  <span className="col-start-1 text-[15px] text-muted md:col-span-2 md:col-start-auto">{j.city}</span>
                  <span className="hidden text-[15px] text-muted md:col-span-2 md:block">{j.type}</span>
                  <span
                    aria-hidden
                    className="col-start-2 row-span-3 row-start-1 grid size-11 place-items-center justify-self-end rounded-full border border-ink/20 transition-colors duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-paper md:col-span-1 md:col-start-auto md:row-span-1 md:row-start-auto"
                  >
                    →
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal className="mt-12 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-lg text-muted">Don&apos;t see your role? We&apos;d still like to hear from you.</p>
          <Link
            href={apply()}
            className="t-label self-start rounded-full bg-ink px-6 py-4 text-paper transition-colors hover:bg-[#333]"
          >
            Send a general application →
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
