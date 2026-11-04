"use server";

import { z } from "zod";

const topics =["general", "partnership", "franchise", "guest", "press", "careers"] as const;

/**
 * Where each enquiry goes. Placeholder inboxes, to be confirmed by Independent
 * and moved to the CMS (enquiryRoute) in Phase 2.
 */
const routes: Record<(typeof topics)[number], string> = {
  general: "hello@indpt.com",
  partnership: "partnerships@indpt.com",
  franchise: "partnerships@indpt.com",
  guest: "guests@indpt.com",
  press: "press@indpt.com",
  careers: "careers@indpt.com",
};

// Missing and empty fields both get the same friendly message.
const required = (msg: string, min = 1) => z.string({ error: msg }).trim().min(min, msg);

const schema = z.object({
  topic: z.enum(topics, { error: "Please choose a topic." }),
  name: required("Please enter your name.", 2),
  email: required("Please enter your email.").pipe(z.email("Please enter a valid email.")),
  phone: z.string().trim().max(30, "That phone number looks too long.").optional(),
  company: z.string().trim().max(120).optional(),
  country: required("Please choose a country."),
  brand: z.string().trim().optional(),
  role: z.string().trim().max(120).optional(),
  message: required("Please add a short message (10+ characters).", 10).pipe(
    z.string().max(4000, "Please keep it under 4,000 characters."),
  ),
});

export type ContactState = {
  ok: boolean;
  errors?: Partial<Record<keyof z.infer<typeof schema>, string>>;
  /** What was submitted, so fields can be refilled after an error. */
  values?: Record<string, string>;
  message?: string;
};

export async function sendEnquiry(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Honeypot: real people never fill this hidden field.
  if (formData.get("website")) return { ok: true };

  const values: Record<string, string> = Object.fromEntries(
    [...formData.entries()]
      .filter(([k]) => !k.startsWith("$ACTION") && k !== "website")
      .map(([k, v]) => [k, String(v)]),
  );
  const parsed = schema.safeParse(values);

  if (!parsed.success) {
    const errors: ContactState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof z.infer<typeof schema>;
      errors[key] ??= issue.message;
    }
    return { ok: false, errors, values };
  }

  const to = routes[parsed.data.topic];
  // TODO(Phase 8): send with Resend + Turnstile check. For now, log the routed enquiry.
  console.log(`[enquiry] → ${to}`, parsed.data);

  return { ok: true, message: `Thanks, ${parsed.data.name.split(" ")[0]}. We'll be in touch soon.` };
}
