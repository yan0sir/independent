import Link from "next/link";
import Logo from "./Logo";
import { brands } from "@/content/brands";

const cols = [
  {
    title: "Explore",
    links: [
      { label: "Brands", href: "/brands" },
      { label: "About", href: "/about" },
      { label: "Leadership", href: "/leadership" },
      { label: "Locations", href: "/locations" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  { title: "Brands", links: brands.map((b) => ({ label: b.name, href: `/brands/${b.slug}` })) },
  {
    title: "Where we are",
    links: [
      { label: "United Arab Emirates", href: "/locations?country=UAE" },
      { label: "Saudi Arabia", href: "/locations?country=Saudi+Arabia" },
      { label: "Qatar", href: "/locations?country=Qatar" },
      { label: "Bahrain", href: "/locations?country=Bahrain" },
      { label: "United Kingdom", href: "/locations?country=United+Kingdom" },
    ],
  },
  {
    title: "Follow",
    links: [
      { label: "Instagram", href: "#" },
      { label: "LinkedIn", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="overflow-hidden bg-ink pt-16 text-inverse md:pt-24">
      <div className="wrap">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo tone="white" className="w-[180px] md:w-[220px]" />
            <p className="mt-8 max-w-xs text-[15px] leading-snug opacity-70">
              A hospitality collective building food brands across the UAE, KSA and
              beyond.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 md:col-span-8">
            {cols.map((c) => (
              <div key={c.title}>
                <p className="t-label mb-4 opacity-50">{c.title}</p>
                <ul className="space-y-2 text-[15px]">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      <Link href={l.href} className="opacity-90 transition-opacity hover:opacity-50">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <p
          aria-hidden
          className="t-display mt-20 select-none whitespace-nowrap text-[min(14.2vw,238px)] leading-[0.8] opacity-[0.08] md:mt-28"
        >
          Independent
        </p>

        <div className="t-label flex flex-col gap-3 border-t border-inverse/15 py-6 opacity-60 md:flex-row md:justify-between">
          <span>© 2026 The Independent Food Company</span>
          <span className="flex gap-6">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
