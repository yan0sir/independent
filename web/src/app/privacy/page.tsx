import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = { title: "Privacy — Independent" };

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy"
      updated="November 2026"
      sections={[
        { heading: "What we collect", body: "When you contact us, we collect the details you choose to share: your name, email, phone number, country and message." },
        { heading: "How we use it", body: "We use your details only to reply to your enquiry and route it to the right team. We do not sell your data." },
        { heading: "Analytics", body: "We use privacy-friendly analytics to understand how the site is used. No advertising cookies are set." },
        { heading: "Your rights", body: "You can ask us to see, correct or delete the information we hold about you at any time by contacting us." },
      ]}
    />
  );
}
