import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import BrandGrid from "@/components/BrandGrid";
import { brands } from "@/content/brands";

export const metadata: Metadata = {
  title: "Brands — Independent",
  description: "SALT, Somewhere, Public, Parker's, Shalwa, Kumo and Joe & The Juice KSA.",
};

export default function BrandsPage() {
  return (
    <main className="pb-28 md:pb-40">
      <PageIntro
        lines={["Seven brands,", "one way of", "doing things."]}
        intro="Six home-grown concepts and one exclusive franchise, across the UAE, Saudi Arabia and Qatar."
      />
      <BrandGrid brands={brands} />
    </main>
  );
}
