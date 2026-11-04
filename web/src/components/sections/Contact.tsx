import Link from "next/link";
import { contact } from "@/content/home";
import { Reveal, RevealLines } from "../Reveal";

/** General contact block: one row per enquiry type, each opens /contact with that topic. */
export default function Contact() {
  return (
    <section id="contact" className="wrap pb-24 pt-28 md:pb-40 md:pt-48">
      <div className="grid gap-12 border-t border-line pt-10 md:grid-cols-12 md:gap-[var(--gutter)] md:pt-14">
        <div className="md:col-span-5">
          <RevealLines className="t-display t-xl" lines={["Let's talk."]} />
          <Reveal className="mt-8 max-w-sm space-y-6" delay={150}>
            <p className="text-lg leading-snug text-muted">
              Whether you&apos;re a guest, a partner or someone who wants to join us,
              there&apos;s a direct line for you.
            </p>
            <a
              href={`mailto:${contact.email}`}
              className="inline-block border-b border-ink pb-1 text-lg"
            >
              {contact.email}
            </a>
          </Reveal>
        </div>

        <ul className="border-t border-line md:col-span-7 md:border-t-0">
          {contact.routes.map((r, i) => (
            <li key={r.topic}>
              <Reveal delay={i * 70}>
                <Link
                  href={`/contact?topic=${r.topic}`}
                  className="group flex items-center justify-between gap-6 border-b border-line py-6 md:py-7"
                >
                  <span>
                    <span className="t-display block text-[clamp(1.5rem,2.6vw,2.25rem)] transition-transform duration-500 ease-[var(--ease-out)] group-hover:translate-x-2">
                      {r.title}
                    </span>
                    <span className="mt-1 block text-[15px] leading-snug text-muted">
                      {r.line}
                    </span>
                  </span>
                  <span
                    aria-hidden
                    className="grid size-11 shrink-0 place-items-center rounded-full border border-ink/20 transition-colors duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-paper"
                  >
                    →
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
