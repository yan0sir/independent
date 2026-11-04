"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

const nav = [
  { href: "/brands", label: "Brands" },
  { href: "/about", label: "About" },
  { href: "/locations", label: "Locations" },
  { href: "/careers", label: "Careers" },
];

export default function Header() {
  const pathname = usePathname();
  // "over" = sitting on a full-bleed hero photo (marked data-hero), so use light colors.
  const [over, setOver] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const hero = document.querySelector("[data-hero]");
      setOver(hero ? hero.getBoundingClientRect().bottom > 80 : false);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  const light = over && !open;
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,color,border-color,padding] duration-500 ${
        light
          ? "border-b border-transparent bg-transparent py-5 text-inverse"
          : "border-b border-line bg-paper/90 py-3 text-ink backdrop-blur-md"
      }`}
    >
      <div className="wrap flex items-center justify-between gap-6">
        <Link
          href="/"
          aria-label="Independent, home"
          onClick={() => setOpen(false)}
          className="block w-[92px] md:w-[108px]"
        >
          <Logo tone={light ? "white" : "black"} priority />
        </Link>

        <nav className="hidden items-center gap-9 md:flex" aria-label="Main">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`t-label relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:bg-current after:transition-transform after:duration-500 hover:after:origin-left hover:after:scale-x-100 ${
                isActive(item.href) ? "after:scale-x-100" : "after:origin-right after:scale-x-0"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className={`t-label rounded-full border px-4 py-2.5 transition-colors duration-300 ${
              light
                ? "border-inverse/60 hover:bg-inverse hover:text-ink"
                : "border-ink bg-ink text-paper hover:bg-transparent hover:text-ink"
            }`}
          >
            Get in touch
          </Link>
        </nav>

        <button
          className="t-label md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="wrap flex h-[calc(100dvh-60px)] flex-col justify-between pb-10 pt-12 md:hidden"
        >
          <ul className="space-y-2">
            {[{ href: "/", label: "Home" }, ...nav].map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={() => setOpen(false)} className="t-display t-l block">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="t-label rounded-full bg-ink px-5 py-4 text-center text-paper"
          >
            Get in touch
          </Link>
        </nav>
      )}
    </header>
  );
}
