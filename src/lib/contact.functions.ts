import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";

import { contactSchema } from "@/lib/contact-schema";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_SUBMISSIONS_PER_WINDOW = 5;
const submissionsByAddress = new Map<string, number[]>();

export const submitContactMessage = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => contactSchema.parse(input))
  .handler(async ({ data }) => {
    if (data.company.trim().length > 0) {
      return { success: true as const };
    }

    const now = Date.now();
    const request = getRequest();
    const address = request.headers.get("cf-connecting-ip") ?? "unknown";
    const recentSubmissions = (submissionsByAddress.get(address) ?? []).filter(
      (timestamp) => now - timestamp < WINDOW_MS,
    );

    if (recentSubmissions.length >= MAX_SUBMISSIONS_PER_WINDOW) {
      return {
        success: false as const,
        error: "Please wait a little before sending another message.",
      };
    }

    submissionsByAddress.set(address, [...recentSubmissions, now]);

    if (submissionsByAddress.size > 500) {
      for (const [trackedAddress, timestamps] of submissionsByAddress) {
        if (timestamps.every((timestamp) => now - timestamp >= WINDOW_MS)) {
          submissionsByAddress.delete(trackedAddress);
        }
      }
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("contact_submissions").insert({
      name: data.name,
      email: data.email,
      message: data.message,
    });

    if (error) {
      return {
        success: false as const,
        error: "Your message could not be saved. Please try again or email me directly.",
      };
    }

    return { success: true as const };
  });