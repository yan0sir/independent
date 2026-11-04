"use client";

import { useActionState, useState } from "react";
import { useSearchParams } from "next/navigation";
import { sendEnquiry, type ContactState } from "@/app/contact/actions";
import { brands } from "@/content/brands";

const topicOptions = [
  { value: "general", label: "General" },
  { value: "partnership", label: "Partnerships & leasing" },
  { value: "franchise", label: "Franchise" },
  { value: "guest", label: "Guest feedback" },
  { value: "press", label: "Press & media" },
  { value: "careers", label: "Careers" },
] as const;

type Topic = (typeof topicOptions)[number]["value"];

const isTopic = (v: string | null): v is Topic => topicOptions.some((t) => t.value === v);

function Field({
  label,
  name,
  error,
  optional,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="t-label mb-2 flex justify-between text-muted">
        <span>{label}</span>
        {optional && <span>Optional</span>}
      </label>
      {children}
      {error && (
        <p id={`${name}-error`} className="mt-1.5 text-[14px] text-[#b3261e]">
          {error}
        </p>
      )}
    </div>
  );
}

export default function ContactForm() {
  const params = useSearchParams();
  const initialTopic = isTopic(params.get("topic")) ? (params.get("topic") as Topic) : "general";
  const [topic, setTopic] = useState<Topic>(initialTopic);
  const [state, action, pending] = useActionState<ContactState, FormData>(sendEnquiry, { ok: false });

  const showCompany = topic === "partnership" || topic === "franchise" || topic === "press";
  const showBrand = topic !== "careers" && topic !== "press";
  const e = state.errors ?? {};
  const v = state.values ?? {};
  // Re-key the fields after each failed submit so they refill with what was sent.
  const k = JSON.stringify(v);

  if (state.ok && state.message) {
    return (
      <div className="border-t border-ink pt-8" role="status">
        <p className="t-display t-l">{state.message}</p>
        <p className="mt-4 text-lg text-muted">
          Your message went to the right team. We usually reply within two working days.
        </p>
      </div>
    );
  }

  return (
    <form action={action} noValidate className="space-y-8">
      <fieldset>
        <legend className="t-label mb-3 text-muted">What&apos;s it about?</legend>
        <div className="flex flex-wrap gap-2">
          {topicOptions.map((t) => (
            <label key={t.value} className="cursor-pointer">
              <input
                type="radio"
                name="topic"
                value={t.value}
                checked={topic === t.value}
                onChange={() => setTopic(t.value)}
                className="peer sr-only"
              />
              <span className="t-label block rounded-full border border-line px-4 py-2.5 transition-colors duration-300 hover:border-ink peer-checked:border-ink peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2">
                {t.label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-6 md:grid-cols-2">
        <Field label="Name" name="name" error={e.name}>
          <input key={`n${k}`} defaultValue={v.name} id="name" name="name" autoComplete="name" className="field" aria-invalid={!!e.name} aria-describedby={e.name ? "name-error" : undefined} />
        </Field>
        <Field label="Email" name="email" error={e.email}>
          <input key={`e${k}`} defaultValue={v.email} id="email" name="email" type="email" autoComplete="email" className="field" aria-invalid={!!e.email} aria-describedby={e.email ? "email-error" : undefined} />
        </Field>
        <Field label="Phone" name="phone" optional error={e.phone}>
          <input key={`p${k}`} defaultValue={v.phone} id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+971 / +966" className="field" />
        </Field>
        <Field label="Country" name="country" error={e.country}>
          <select key={`c${k}`} id="country" name="country" defaultValue={v.country ?? ""} className="field" aria-invalid={!!e.country}>
            <option value="" disabled>
              Choose a country
            </option>
            <option>United Arab Emirates</option>
            <option>Saudi Arabia</option>
            <option>Qatar</option>
            <option>Bahrain</option>
            <option>United Kingdom</option>
            <option>Other GCC country</option>
            <option>Outside the GCC</option>
          </select>
        </Field>

        {showCompany && (
          <Field label="Company" name="company" optional error={e.company}>
            <input key={`co${k}`} defaultValue={v.company} id="company" name="company" autoComplete="organization" className="field" />
          </Field>
        )}
        {showBrand && (
          <Field label="Brand" name="brand" optional error={e.brand}>
            <select key={`b${k}`} id="brand" name="brand" defaultValue={v.brand ?? params.get("brand") ?? ""} className="field">
              <option value="">Any / not sure</option>
              {brands.map((b) => (
                <option key={b.slug} value={b.slug}>
                  {b.name}
                </option>
              ))}
            </select>
          </Field>
        )}
        {topic === "careers" && (
          <Field label="Role you're interested in" name="role" optional error={e.role}>
            <input key={`r${k}`} id="role" name="role" defaultValue={v.role ?? params.get("role") ?? ""} className="field" />
          </Field>
        )}
      </div>

      <Field label="Message" name="message" error={e.message}>
        <textarea key={`m${k}`} defaultValue={v.message} id="message" name="message" rows={6} className="field resize-y" aria-invalid={!!e.message} aria-describedby={e.message ? "message-error" : undefined} />
      </Field>

      {/* Honeypot */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="max-w-sm text-[14px] text-muted">
          We only use your details to reply to this message. See our{" "}
          <a href="/privacy" className="underline underline-offset-2">privacy policy</a>.
        </p>
        <button
          type="submit"
          disabled={pending}
          className="t-label rounded-full bg-ink px-8 py-4 text-paper transition-colors hover:bg-[#333] disabled:opacity-60"
        >
          {pending ? "Sending…" : "Send message →"}
        </button>
      </div>
    </form>
  );
}
