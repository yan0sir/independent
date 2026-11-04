import Image from "next/image";
import { img } from "@/content/home";
import { Reveal, RevealLines } from "../Reveal";
import Link from "next/link";

export default function Story() {
  return (
    <section id="story" className="wrap pt-28 md:pt-48">
      <div className="grid gap-10 md:grid-cols-12 md:gap-[var(--gutter)]">
        <div className="md:col-span-5 md:col-start-1">
          <Reveal variant="img" className="relative aspect-[4/5] overflow-hidden bg-card">
            <Image
              src={img("1544025162-d76694265947", 1200)}
              alt="Placeholder: archive photo of the original SALT trailer"
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover"
            />
          </Reveal>
          <p className="t-label mt-3 flex justify-between text-muted">
            <span>Kite Beach, Dubai</span>
            <span>2014</span>
          </p>
        </div>

        <div className="flex flex-col justify-between md:col-span-6 md:col-start-7">
          <div>
            <RevealLines
              className="t-display t-l"
              lines={["Simple things,", "done in the", "greatest way."]}
            />
          </div>

          <div className="mt-10 max-w-xl space-y-5 text-lg leading-relaxed md:mt-0">
            <Reveal>
              <p>
                SALT began in an Airstream trailer on Dubai&apos;s Kite Beach in 2014. It
                was never just about a food truck. It was about taking the familiar and
                the classic, and making it into something people come back for.
              </p>
            </Reveal>
            <Reveal delay={100}>
              <p className="text-muted">
                That idea grew into Independent: the group behind SALT, Public,
                Parker&apos;s, Somewhere, Shalwa and Kumo, and the exclusive franchisee
                of Joe &amp; The Juice in Saudi Arabia.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <Link href="/about" className="t-label inline-block border-b border-ink pb-1">
                Read our story →
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
