import Hero from "@/components/sections/Hero";
import Numbers from "@/components/sections/Numbers";
import BrandCarousel from "@/components/sections/BrandCarousel";
import Story from "@/components/sections/Story";
import Moments from "@/components/sections/Moments";
import Contact from "@/components/sections/Contact";
import { brands } from "@/content/brands";

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "The Independent Food Company",
  alternateName: "Independent",
  url: "https://indpt.com",
  logo: "https://indpt.com/brand/logo-black.webp",
  areaServed: ["AE", "SA", "QA"],
  brand: brands.map((b) => ({ "@type": "Brand", name: b.name })),
};

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <Numbers />
      <BrandCarousel />
      <Story />
      <Moments />
      <Contact />
    </main>
  );
}
