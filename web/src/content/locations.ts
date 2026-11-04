/**
 * Branch list from Independent (SALT only so far; other brands' branches TBC).
 * City grouping and coordinates are approximate and need confirming with real
 * addresses. Entries marked `tbc` have a name that doesn't identify an area, so
 * their city is a best guess.
 */

export type Country = "UAE" | "Saudi Arabia" | "Qatar" | "Bahrain" | "United Kingdom";

export type Location = {
  id: string;
  brand: string; // brand slug
  area: string; // branch name without the brand prefix
  city: string;
  country: Country;
  lat: number;
  lng: number;
  tbc?: boolean;
};

type Raw = [area: string, city: string, country: Country, lat: number, lng: number, tbc?: boolean];

const salt: Raw[] = [
  // UAE: Abu Dhabi
  ["Abu Dhabi", "Abu Dhabi", "UAE", 24.4539, 54.3773],
  ["Galleria Mall", "Abu Dhabi", "UAE", 24.5007, 54.3895],
  ["Khalifa City", "Abu Dhabi", "UAE", 24.419, 54.578],
  ["Marsana Beach", "Abu Dhabi", "UAE", 24.431, 54.327],
  ["Shamkha", "Abu Dhabi", "UAE", 24.392, 54.702],
  ["Spot", "Abu Dhabi", "UAE", 24.466, 54.605, true],
  ["Syde", "Abu Dhabi", "UAE", 24.545, 54.434, true],
  // UAE: Dubai
  ["Barsha", "Dubai", "UAE", 25.113, 55.2],
  ["at the Museum", "Dubai", "UAE", 25.2192, 55.282],
  ["Business Bay", "Dubai", "UAE", 25.185, 55.265],
  ["Downtown", "Dubai", "UAE", 25.1972, 55.2744],
  ["Drive-by", "Dubai", "UAE", 25.14, 55.23, true],
  ["DXBike", "Dubai", "UAE", 25.103, 55.244, true],
  ["First Avenue", "Dubai", "UAE", 25.046, 55.235],
  ["Hessa", "Dubai", "UAE", 25.07, 55.225],
  ["Jumeirah 2", "Dubai", "UAE", 25.201, 55.242],
  ["Khawaneej", "Dubai", "UAE", 25.247, 55.487],
  ["Kite Beach", "Dubai", "UAE", 25.159, 55.198],
  ["Marina", "Dubai", "UAE", 25.0805, 55.1403],
  ["Marsa Al Arab", "Dubai", "UAE", 25.1395, 55.187],
  // UAE: Ras Al Khaimah
  ["Hamra", "Ras Al Khaimah", "UAE", 25.693, 55.78],
  ["Marjan", "Ras Al Khaimah", "UAE", 25.67, 55.741],
  // UAE: Sharjah
  ["Al Zahia", "Sharjah", "UAE", 25.295, 55.496],
  ["Heera Beach", "Sharjah", "UAE", 25.372, 55.411],
  ["Zero 6", "Sharjah", "UAE", 25.306, 55.463],
  // KSA
  ["Al-Ula", "AlUla", "Saudi Arabia", 26.608, 37.923],
  ["Al Qassim", "Al Qassim", "Saudi Arabia", 26.326, 43.975],
  ["U-Walk", "Riyadh", "Saudi Arabia", 24.77, 46.638],
  ["Saad Square", "Riyadh", "Saudi Arabia", 24.72, 46.67, true],
  ["Riyadh Park", "Riyadh", "Saudi Arabia", 24.755, 46.629],
  ["Khobar", "Al Khobar", "Saudi Arabia", 26.29, 50.22],
  ["Nakheel Mall", "Riyadh", "Saudi Arabia", 24.77, 46.713],
  ["Al Bahar", "Jeddah", "Saudi Arabia", 21.59, 39.105, true],
  // Qatar
  ["Qatar", "Doha", "Qatar", 25.2854, 51.531],
];

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const locations: Location[] = salt.map(([area, city, country, lat, lng, tbc]) => ({
  id: `salt-${slugify(area)}`,
  brand: "salt",
  area,
  city,
  country,
  lat,
  lng,
  tbc,
}));

export const countries: Country[] = ["UAE", "Saudi Arabia", "Qatar", "Bahrain", "United Kingdom"];

/** Where the map goes for a country with no branches listed yet. */
export const countryView: Record<Country, { lng: number; lat: number; zoom: number }> = {
  UAE: { lng: 54.8, lat: 24.6, zoom: 6.5 },
  "Saudi Arabia": { lng: 44.5, lat: 24.2, zoom: 4.6 },
  Qatar: { lng: 51.2, lat: 25.3, zoom: 8 },
  Bahrain: { lng: 50.55, lat: 26.07, zoom: 9.5 },
  "United Kingdom": { lng: -2.5, lat: 54.2, zoom: 4.8 },
};

/** Display name of a branch, e.g. "SALT Kite Beach". */
export const branchName = (brandName: string, l: Location) =>
  l.area === "at the Museum" ? `${brandName} at the Museum` : `${brandName} ${l.area}`;

export const mapsLink = (l: Location) =>
  `https://www.google.com/maps/search/?api=1&query=${l.lat},${l.lng}`;
