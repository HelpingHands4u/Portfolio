import { describe, expect, it } from "vitest";

import { contactSchema } from "@/lib/contact-schema";

describe("portfolio contact form validation", () => {
  it("accepts a valid contact message and trims the name and email", () => {
    expect(
      contactSchema.parse({
        name: "  Asha Rao  ",
        email: "  asha@example.com ",
        message: "I would like to discuss a project opportunity.",
        company: "",
      }),
    ).toEqual({
      name: "Asha Rao",
      email: "asha@example.com",
      message: "I would like to discuss a project opportunity.",
      company: "",
    });
  });

  it("rejects an invalid email address", () => {
    expect(
      contactSchema.safeParse({
        name: "Asha Rao",
        email: "not-an-email",
        message: "I would like to discuss a project opportunity.",
        company: "",
      }).success,
    ).toBe(false);
  });

  it("requires a message of at least 10 characters", () => {
    expect(
      contactSchema.safeParse({
        name: "Asha Rao",
        email: "asha@example.com",
        message: "Hello",
        company: "",
      }).success,
    ).toBe(false);
  });

  it("rejects contact input longer than 3,000 characters", () => {
    expect(
      contactSchema.safeParse({
        name: "Asha Rao",
        email: "asha@example.com",
        message: "x".repeat(3001),
        company: "",
      }).success,
    ).toBe(false);
  });
});