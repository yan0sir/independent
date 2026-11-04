/**
 * About, Leadership and Careers placeholder content.
 * Timeline years after 2014, leadership names and bios, jobs and office
 * addresses are TBC by Independent.
 */

/** Photos are Unsplash placeholders; years after 2014 are TBC. */
export const timeline = [
  { year: "2014", title: "A trailer on Kite Beach", line: "SALT starts serving from an Airstream on Dubai's Kite Beach.", image: "1529042410759-befb1204b468" },
  { year: "2016", title: "SALT finds a permanent home", line: "The trailer becomes a destination with its first fixed sites.", image: "1568901346375-23c9450c58cd" },
  { year: "2018", title: "New concepts", line: "Public and Parker's open, and the group takes shape as Independent.", image: "1555396273-367ea4eb4db5" },
  { year: "2019", title: "Into Saudi Arabia", line: "SALT opens in Riyadh and the Kingdom becomes our second home.", image: "1414235077428-338989a2e8c0" },
  { year: "2021", title: "Joe & The Juice", line: "We become the exclusive franchisee of Joe & The Juice in KSA.", image: "1600271886742-f049cd451bba" },
  { year: "2023", title: "Shalwa & Kumo", line: "Two new home-grown concepts join the family.", image: "1546069901-ba9599a7e63c" },
  { year: "2026", title: "Three countries", line: "Seven brands across the UAE, Saudi Arabia and Qatar.", image: "1528605248644-14dd04022da1" },
];

export const principles = [
  { title: "Imagination", line: "We start from a feeling, not a format. Every brand begins with how we want people to feel when they walk in." },
  { title: "Creativity", line: "Simple things, done in the greatest way. We sweat the details most people never notice." },
  { title: "Innovation", line: "We keep upstaging ourselves: pop-ups, collaborations and menus that keep people guessing." },
  { title: "Vision", line: "We build brands to last and to travel, from one trailer to the whole region." },
];

export type Person = { name: string; role: string; bio: string; linkedin?: string };

export const people: Person[] = [
  { name: "Name to confirm", role: "Founder & CEO", bio: "Started SALT from a trailer on Kite Beach in 2014 and has led Independent's growth across the GCC since." },
  { name: "Name to confirm", role: "Chief Operating Officer", bio: "Oversees operations across all brands and markets, from openings to day-to-day service." },
  { name: "Name to confirm", role: "Chief Financial Officer", bio: "Leads finance, investment and expansion planning for the group." },
  { name: "Name to confirm", role: "Chief Brand Officer", bio: "Shapes the identity and creative direction of every Independent brand." },
  { name: "Name to confirm", role: "Managing Director, KSA", bio: "Leads the group's business in the Kingdom of Saudi Arabia." },
  { name: "Name to confirm", role: "Managing Director, UAE", bio: "Leads the group's business in the United Arab Emirates." },
  { name: "Name to confirm", role: "Director of Culinary", bio: "Leads menu development and kitchen standards across the portfolio." },
  { name: "Name to confirm", role: "Director of People", bio: "Builds the teams and culture behind every counter and kitchen." },
];

export type Job = { title: string; brand: string; city: string; type: "Full-time" | "Part-time" };

export const jobs: Job[] = [
  { title: "Restaurant General Manager", brand: "SALT", city: "Riyadh", type: "Full-time" },
  { title: "Head Chef", brand: "Somewhere", city: "Dubai", type: "Full-time" },
  { title: "Barista", brand: "Joe & The Juice", city: "Jeddah", type: "Full-time" },
  { title: "Brand Marketing Manager", brand: "Independent", city: "Dubai", type: "Full-time" },
  { title: "Shift Supervisor", brand: "Kumo", city: "Riyadh", type: "Full-time" },
  { title: "Pastry Chef", brand: "Parker's", city: "Dubai", type: "Full-time" },
  { title: "Finance Analyst", brand: "Independent", city: "Riyadh", type: "Full-time" },
  { title: "Weekend Team Member", brand: "Shalwa", city: "Riyadh", type: "Part-time" },
];

export const offices = [
  { city: "Dubai", country: "United Arab Emirates", address: "Address to confirm" },
  { city: "Riyadh", country: "Saudi Arabia", address: "Address to confirm" },
];
