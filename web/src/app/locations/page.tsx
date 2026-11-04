import { Suspense } from "react";
import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import LocationsExplorer from "@/components/LocationsExplorer";
import { locations } from "@/content/locations";

export const metadata: Metadata = {
  title: "Locations — Independent",
  description: "Find SALT and the rest of the Independent family across the UAE, Saudi Arabia and Qatar.",
};

export default function LocationsPage() {
  return (
    <main>
      <PageIntro
        lines={["Find us."]}
        intro={`${locations.length} branches across the UAE, Saudi Arabia and Qatar. Filter by country, city or brand.`}
      />
      <Suspense fallback={<div className="wrap h-[70vh]" />}>
        <LocationsExplorer />
      </Suspense>
    </main>
  );
}
