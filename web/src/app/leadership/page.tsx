import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import LeadershipGrid from "@/components/LeadershipGrid";
import { people } from "@/content/company";

export const metadata: Metadata = {
  title: "Leadership — Independent",
  description: "The team leading the Independent Food Company.",
};

export default function LeadershipPage() {
  return (
    <main className="pb-24 md:pb-40">
      <PageIntro
        lines={["The people", "behind the", "places."]}
        intro="A team of operators, chefs and brand builders who have grown Independent from one trailer to seven brands."
      />
      <section className="wrap">
        <div className="border-t border-line pt-8">
          <LeadershipGrid people={people} />
        </div>
      </section>
    </main>
  );
}
