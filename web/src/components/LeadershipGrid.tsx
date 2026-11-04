"use client";

import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import type { Person } from "@/content/company";

/** Keypass-style 4:5 portrait grid; click opens a side panel with the bio. */
export default function LeadershipGrid({ people }: { people: Person[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open !== null && !d.open) d.showModal();
    if (open === null && d.open) d.close();
  }, [open]);

  const person = open !== null ? people[open] : null;

  return (
    <>
      <ul className="grid grid-cols-2 gap-x-[var(--gutter)] gap-y-10 md:grid-cols-3 xl:grid-cols-4">
        {people.map((p, i) => (
          <li key={p.role}>
            <button onClick={() => setOpen(i)} className="group block w-full text-start">
              {/* Portrait placeholder until photos arrive */}
              <div className="relative grid aspect-[4/5] place-items-center overflow-hidden bg-card transition-colors duration-500 group-hover:bg-[#ebe6db]">
                <Logo tone="black" className="w-1/3 opacity-[0.12]" />
              </div>
              <p className="t-display mt-3 text-[clamp(1.15rem,1.6vw,1.4rem)]">{p.name}</p>
              <p className="t-label mt-1 text-muted">{p.role}</p>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        onClose={() => setOpen(null)}
        onClick={(e) => e.target === dialog.current && setOpen(null)}
        className="ms-auto me-0 h-dvh max-h-none w-full max-w-lg bg-paper p-0 text-ink backdrop:bg-black/40"
      >
        {person && (
          <div className="flex h-full flex-col p-6 md:p-10">
            <button onClick={() => setOpen(null)} className="t-label self-end">
              Close ✕
            </button>
            <div className="mt-8 grid aspect-[4/5] w-2/3 place-items-center bg-card">
              <Logo tone="black" className="w-1/3 opacity-[0.12]" />
            </div>
            <h2 className="t-display t-m mt-8">{person.name}</h2>
            <p className="t-label mt-2 text-muted">{person.role}</p>
            <p className="mt-6 text-lg leading-relaxed">{person.bio}</p>
            {person.linkedin && (
              <a href={person.linkedin} className="t-label mt-6 self-start border-b border-ink pb-1">
                LinkedIn ↗
              </a>
            )}
          </div>
        )}
      </dialog>
    </>
  );
}
