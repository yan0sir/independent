import PageIntro from "./PageIntro";

/** Simple long-form text page for legal content. */
export default function LegalPage({
  title,
  updated,
  sections,
}: {
  title: string;
  updated: string;
  sections: { heading: string; body: string }[];
}) {
  return (
    <main className="pb-24 md:pb-40">
      <PageIntro lines={[title]} intro={`Last updated ${updated}. Placeholder text, to be replaced with Independent's approved legal copy.`} />
      <section className="wrap">
        <div className="grid border-t border-line pt-10 md:grid-cols-12">
          <div className="space-y-10 md:col-span-7 md:col-start-5">
            {sections.map((s) => (
              <div key={s.heading}>
                <h2 className="t-display t-m">{s.heading}</h2>
                <p className="mt-3 text-lg leading-relaxed text-muted">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
