import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Independent — The Independent Food Company",
  description:
    "A hospitality group building food brands across the UAE, KSA and the GCC: SALT, Somewhere, Public, Parker's, Shalwa, Kumo and Joe & The Juice KSA.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={instrument.variable}
    >
      <body>
        <SmoothScroll />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
