import Image from "next/image";
import { img } from "@/content/home";
import { Reveal } from "./Reveal";

/** Bruno-style masonry of photos with small captions. */
export default function Gallery({
  items,
}: {
  items: { id: string; ratio: string; caption: string }[];
}) {
  return (
    <div className="columns-1 gap-[var(--gutter)] sm:columns-2 lg:columns-3">
      {items.map((g, i) => (
        <Reveal key={g.id + i} className="mb-[var(--gutter)] break-inside-avoid" delay={(i % 3) * 80}>
          <figure className="group">
            <div className="relative overflow-hidden bg-card" style={{ aspectRatio: g.ratio }}>
              <Image
                src={img(g.id, 1000)}
                alt={g.caption}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-out)] group-hover:scale-[1.04]"
              />
            </div>
            <figcaption className="mt-2 text-[15px] text-muted">{g.caption}</figcaption>
          </figure>
        </Reveal>
      ))}
    </div>
  );
}
