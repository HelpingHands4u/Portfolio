import { z } from "zod";

export const contactSchema = z
  .object({
    name: z.string().trim().min(1, "Enter your name.").max(100, "Keep your name under 100 characters."),
    email: z
      .string()
      .trim()
      .email("Enter a valid email address.")
      .max(254, "Keep your email under 255 characters."),
    message: z
      .string()
      .trim()
      .min(10, "Write at least 10 characters.")
      .max(3000, "Keep your message under 3,000 characters."),
    company: z.string().max(200),
  })
  .strict();

export type ContactMessageInput = z.infer<typeof contactSchema>;