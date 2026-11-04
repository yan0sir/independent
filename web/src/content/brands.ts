/**
 * Brand profiles. Placeholder content until Sanity (Phase 2).
 * Brand list confirmed by Independent. Only SALT's origin story comes from the
 * current site; categories, copy, colors and links for the others are TBC.
 */
import { locations, type Country } from "./locations";

const countryShort: Record<Country, string> = {
  UAE: "UAE",
  "Saudi Arabia": "KSA",
  Qatar: "Qatar",
  Bahrain: "Bahrain",
  "United Kingdom": "UK",
};

export type Brand = {
  slug: string;
  name: string;
  type: "Home-grown" | "Franchise";
  category: string;
  since?: string;
  line: string;
  story: string[];
  color: string;
  image: string; // card + hero
  image2: string; // hover swap on the brands grid
  gallery: { id: string; ratio: string; caption: string }[];
  links: { label: string; href: string }[];
};

const raw: Brand[] = [
  {
    slug: "salt",
    name: "SALT",
    type: "Home-grown",
    category: "Burgers & soft serve",
    since: "2014",
    line: "Our flagship. Born in an Airstream on Kite Beach.",
    story: [
      "SALT is our flagship brand and the starting point of the Independent movement. It sprouted from an Airstream trailer on Dubai's Kite Beach in 2014. It was never just about a food truck, but about doing simple things in the greatest way.",
      "SALT celebrates the comfortable, the familiar and the classic, reimagined through creative experiences that stick with you. It has the freedom to travel and pop up in unexpected places, so get ready.",
    ],
    color: "#e9d9b8",
    image: "1568901346375-23c9450c58cd",
    image2: "1561758033-d89a9ad46330",
    gallery: [
      { id: "1550547660-d9450f859349", ratio: "4/5", caption: "The classic slider" },
      { id: "1529042410759-befb1204b468", ratio: "3/4", caption: "Pop-up weekends" },
      { id: "1571091718767-18b5b1457add", ratio: "1/1", caption: "Fresh off the grill" },
      { id: "1528605248644-14dd04022da1", ratio: "4/3", caption: "Kite Beach crowds" },
      { id: "1561758033-d89a9ad46330", ratio: "4/5", caption: "Built to share" },
      { id: "1533777857889-4be7c70b33f7", ratio: "3/4", caption: "Soft serve season" },
    ],
    links: [
      { label: "Website", href: "#" },
      { label: "Instagram", href: "#" },
    ],
  },
  {
    slug: "somewhere",
    name: "Somewhere",
    type: "Home-grown",
    category: "Restaurant & lounge",
    line: "Somewhere you'll want to stay a little longer.",
    story: [
      "Somewhere is about the long lunch and the late dinner: a room designed for lingering, with a menu that travels.",
      "Set by the water or above the city, every Somewhere is a destination of its own.",
    ],
    color: "#d9d4e6",
    image: "1559339352-11d035aa65de",
    image2: "1424847651672-bf20a4b0982b",
    gallery: [
      { id: "1424847651672-bf20a4b0982b", ratio: "4/5", caption: "Golden hour" },
      { id: "1414235077428-338989a2e8c0", ratio: "4/3", caption: "Dinner service" },
      { id: "1600891964599-f61ba0e24092", ratio: "1/1", caption: "From the grill" },
      { id: "1559339352-11d035aa65de", ratio: "3/4", caption: "The terrace" },
      { id: "1466978913421-dad2ebd01d17", ratio: "4/5", caption: "Table for two" },
    ],
    links: [
      { label: "Website", href: "#" },
      { label: "Instagram", href: "#" },
    ],
  },
  {
    slug: "public",
    name: "Public",
    type: "Home-grown",
    category: "All-day dining",
    line: "A neighbourhood table for everyone.",
    story: [
      "Public is built around the idea of a table that belongs to the neighbourhood: open early, busy at lunch, warm at night.",
      "Seasonal plates, generous portions and a room that feels like it's always been there.",
    ],
    color: "#d8e0d1",
    image: "1504674900247-0877df9cc836",
    image2: "1555396273-367ea4eb4db5",
    gallery: [
      { id: "1512621776951-a57141f2eefd", ratio: "4/5", caption: "Seasonal bowls" },
      { id: "1555396273-367ea4eb4db5", ratio: "4/3", caption: "The dining room" },
      { id: "1540189549336-e6e99c3679fe", ratio: "1/1", caption: "Lunch, properly" },
      { id: "1473093295043-cdd812d0e601", ratio: "3/4", caption: "Pasta night" },
      { id: "1546069901-ba9599a7e63c", ratio: "4/5", caption: "Greens" },
    ],
    links: [
      { label: "Website", href: "#" },
      { label: "Instagram", href: "#" },
    ],
  },
  {
    slug: "parkers",
    name: "Parker's",
    type: "Home-grown",
    category: "Café & kitchen",
    line: "Comfort classics, done properly.",
    story: [
      "Parker's is the café you plan your weekend around: breakfasts worth queueing for, cakes worth sharing and coffee that keeps up.",
      "Familiar dishes, made with care, in rooms full of light.",
    ],
    color: "#f0d4c4",
    image: "1567620905732-2d1ec7ab7445",
    image2: "1525610553991-2bede1a236e2",
    gallery: [
      { id: "1525610553991-2bede1a236e2", ratio: "1/1", caption: "All-day breakfast" },
      { id: "1482049016688-2d3e1b311543", ratio: "4/5", caption: "Eggs, your way" },
      { id: "1554118811-1e0d58224f24", ratio: "4/3", caption: "Morning light" },
      { id: "1567620905732-2d1ec7ab7445", ratio: "3/4", caption: "The stack" },
      { id: "1509042239860-f550ce710b93", ratio: "4/5", caption: "Coffee, always" },
    ],
    links: [
      { label: "Website", href: "#" },
      { label: "Instagram", href: "#" },
    ],
  },
  {
    slug: "joe-and-the-juice",
    name: "Joe & The Juice",
    type: "Franchise",
    category: "Juice & coffee bar",
    line: "Exclusive franchisee in Saudi Arabia.",
    story: [
      "Independent is the exclusive franchisee of Joe & The Juice in the Kingdom of Saudi Arabia.",
      "We bring the brand's juice, coffee and sandwiches to the busiest streets and malls across the Kingdom, run by our own teams.",
    ],
    color: "#f2cfd6",
    image: "1600271886742-f049cd451bba",
    image2: "1505252585461-04db1eb84625",
    gallery: [
      { id: "1505252585461-04db1eb84625", ratio: "4/5", caption: "Fresh pressed" },
      { id: "1600271886742-f049cd451bba", ratio: "1/1", caption: "The juice bar" },
      { id: "1559329007-40df8a9345d8", ratio: "4/3", caption: "On the go" },
      { id: "1544025162-d76694265947", ratio: "3/4", caption: "Sandwiches" },
    ],
    links: [{ label: "Website", href: "#" }],
  },
  {
    slug: "shalwa",
    name: "Shalwa",
    type: "Home-grown",
    category: "Concept to confirm",
    line: "More on Shalwa soon.",
    story: [
      "Shalwa is one of Independent's newest concepts. Its full story, menu and locations are coming soon.",
    ],
    color: "#e3d6c3",
    image: "1504754524776-8f4f37790ca0",
    image2: "1466978913421-dad2ebd01d17",
    gallery: [
      { id: "1504754524776-8f4f37790ca0", ratio: "4/5", caption: "Placeholder" },
      { id: "1466978913421-dad2ebd01d17", ratio: "4/3", caption: "Placeholder" },
      { id: "1559925393-8be0ec4767c8", ratio: "1/1", caption: "Placeholder" },
    ],
    links: [{ label: "Instagram", href: "#" }],
  },
  {
    slug: "kumo",
    name: "Kumo",
    type: "Home-grown",
    category: "Concept to confirm",
    line: "More on Kumo soon.",
    story: [
      "Kumo is one of Independent's newest concepts. Its full story, menu and locations are coming soon.",
    ],
    color: "#d5dde3",
    image: "1546069901-ba9599a7e63c",
    image2: "1540189549336-e6e99c3679fe",
    gallery: [
      { id: "1546069901-ba9599a7e63c", ratio: "4/5", caption: "Placeholder" },
      { id: "1540189549336-e6e99c3679fe", ratio: "1/1", caption: "Placeholder" },
      { id: "1565299624946-b28f40a0ae38", ratio: "4/3", caption: "Placeholder" },
    ],
    links: [{ label: "Instagram", href: "#" }],
  },
];

/** Branch count and markets are derived from the locations list. */
export const brands = raw.map((b) => {
  const own = locations.filter((l) => l.brand === b.slug);
  const countries = [...new Set(own.map((l) => l.country))];
  return {
    ...b,
    branches: own.length,
    countries,
    markets: countries.map((c) => countryShort[c]).join(" · "),
  };
});

export type BrandWithStats = (typeof brands)[number];

export const getBrand = (slug: string) => brands.find((b) => b.slug === slug);
