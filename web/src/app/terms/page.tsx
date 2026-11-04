import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = { title: "Terms — Independent" };

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms"
      updated="November 2026"
      sections={[
        { heading: "Using this site", body: "This website is provided by the Independent Food Company for information about our group and brands." },
        { heading: "Content", body: "Brand names, logos, photography and text on this site belong to Independent or its partners and may not be reused without permission." },
        { heading: "Accuracy", body: "We keep locations, menus and opening details as current as we can, but they may change without notice." },
        { heading: "Contact", body: "Questions about these terms can be sent through our contact page." },
      ]}
    />
  );
}
