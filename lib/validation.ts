import { z } from "zod";

export const signUpSchema = z.object({
  fullName: z.string().min(3, {
    message: "Name must be at least 3 characters long",
  }),
  email: z.string().email({ message: "Invalid email address" }),
  universityId: z.coerce.number(),
  universityCard: z
    .string()
    .nonempty("University Card is required"),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
});

export const signInSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8),
});
