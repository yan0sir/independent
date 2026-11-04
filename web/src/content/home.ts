/**
 * Placeholder homepage content. This moves to Sanity in Phase 2.
 * Photos are Unsplash stand-ins. Brand categories, markets, colors and
 * numbers marked TBC must be confirmed by Independent.
 */

export const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;

export const heroImages = [
  "1414235077428-338989a2e8c0",
  "1555396273-367ea4eb4db5",
  "1517248135467-4c7edcad34c4",
  "1551218808-94e220e084d2",
];

export const numbers = [
  { value: 40, suffix: "+", label: "Branches" },
  { value: 7, suffix: "", label: "Brands" },
  { value: 15, suffix: "+", label: "Years in F&B" },
  { value: 3, suffix: "", label: "Countries" },
];

export { brands } from "./brands";
export type { BrandWithStats as Brand } from "./brands";

/** Contact routes; each maps to a topic on /contact (brief §4). Email is TBC. */
export const contact = {
  email: "hello@indpt.com", // TBC
  routes: [
    { topic: "general", title: "General enquiries", line: "Anything else, we're listening." },
    { topic: "partnership", title: "Partnerships & leasing", line: "Have a space or an idea? Let's build something there." },
    { topic: "guest", title: "Guest feedback", line: "Tell us about your visit to any of our brands." },
    { topic: "press", title: "Press & media", line: "Interviews, features and brand assets." },
    { topic: "careers", title: "Careers", line: "Join the teams behind the counter and the kitchen." },
  ],
};

export type Moment = {
  kind: "Opening" | "Press" | "Pop-up" | "Dish" | "Award" | "People";
  brand?: string;
  date: string;
  title: string;
  line: string;
  image?: string;
  ratio?: string; // CSS aspect-ratio
  quote?: string; // text-only press card
};

export const moments: Moment[] = [
  {
    kind: "Opening",
    brand: "SALT",
    date: "Oct 2026",
    title: "SALT opens at U-Walk, Riyadh",
    line: "Our flagship's newest home, with a menu made for the city.",
    image: "1561758033-d89a9ad46330",
    ratio: "4/5",
  },
  {
    kind: "Dish",
    brand: "Parker's",
    date: "Sep 2026",
    title: "The breakfast everyone orders twice",
    line: "Back on the menu all day.",
    image: "1525610553991-2bede1a236e2",
    ratio: "1/1",
  },
  {
    kind: "Press",
    date: "Sep 2026",
    title: "Featured in regional press",
    line: "On building home-grown brands that travel.",
    quote: "“A home-grown group that keeps upstaging itself.”",
  },
  {
    kind: "Pop-up",
    brand: "SALT",
    date: "Aug 2026",
    title: "A trailer, a beach, a weekend",
    line: "We took SALT back to where it started.",
    image: "1529042410759-befb1204b468",
    ratio: "3/4",
  },
  {
    kind: "People",
    date: "Jul 2026",
    title: "The teams behind the counter",
    line: "Over a thousand people across the GCC (TBC).",
    image: "1528605248644-14dd04022da1",
    ratio: "4/3",
  },
  {
    kind: "Opening",
    brand: "Joe & The Juice",
    date: "Jun 2026",
    title: "Joe & The Juice, now in Jeddah",
    line: "Our franchise keeps growing across the Kingdom.",
    image: "1505252585461-04db1eb84625",
    ratio: "4/5",
  },
  {
    kind: "Award",
    brand: "Somewhere",
    date: "May 2026",
    title: "Recognised among the region's best",
    line: "Award name and year to confirm.",
    image: "1424847651672-bf20a4b0982b",
    ratio: "1/1",
  },
  {
    kind: "Dish",
    brand: "Public",
    date: "Apr 2026",
    title: "Seasonal plates at Public",
    line: "Simple things, done in the greatest way.",
    image: "1512621776951-a57141f2eefd",
    ratio: "3/4",
  },
  {
    kind: "Opening",
    brand: "SALT",
    date: "Mar 2026",
    title: "SALT arrives in Qatar",
    line: "Our first branch outside the UAE and KSA.",
    image: "1501339847302-ac426a4a7cbb",
    ratio: "4/5",
  },
];
