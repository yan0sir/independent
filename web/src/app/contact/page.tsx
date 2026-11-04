import { Suspense } from "react";
import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import ContactForm from "@/components/ContactForm";
import { contact } from "@/content/home";
import { offices } from "@/content/company";

export const metadata: Metadata = {
  title: "Contact — Independent",
  description: "Get in touch with Independent: partnerships, press, careers, guest feedback and general enquiries.",
};

export default function ContactPage() {
  return (
    <main className="pb-24 md:pb-40">
      <PageIntro
        lines={["Let's talk."]}
        intro="Pick a topic and your message goes straight to the right team."
      />
      <section className="wrap">
        <div className="grid gap-16 border-t border-line pt-10 md:grid-cols-12 md:gap-[var(--gutter)]">
          <div className="md:col-span-7">
            <Suspense fallback={null}>
              <ContactForm />
            </Suspense>
          </div>

          <aside className="space-y-10 md:col-span-4 md:col-start-9">
            <div>
              <p className="t-label mb-2 text-muted">Email</p>
              <a href={`mailto:${contact.email}`} className="text-lg underline-offset-4 hover:underline">
                {contact.email}
              </a>
            </div>
            {offices.map((o) => (
              <div key={o.city}>
                <p className="t-label mb-2 text-muted">{o.city}</p>
                <p className="text-lg leading-snug">
                  {o.address}
                  <br />
                  {o.country}
                </p>
              </div>
            ))}
            <div>
              <p className="t-label mb-2 text-muted">Follow</p>
              <p className="flex gap-6 text-lg">
                <a href="#" className="hover:underline">Instagram</a>
                <a href="#" className="hover:underline">LinkedIn</a>
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
