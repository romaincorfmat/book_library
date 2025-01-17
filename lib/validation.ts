import { z } from "zod";

export const signUpSchema = z.object({
  fullName: z.string().min(3, {
    message: "Name must be at least 3 characters long",
  }),
  email: z.string().email({ message: "Invalid email address" }),
  universityId: z.coerce.number(),
  universityCard: z.string().nonempty("University Card is required"),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
});

export const signInSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8),
});

export const bookSchema = z.object({
  title: z.string().trim().min(2).max(100),
  description: z.string().trim().min(2).max(100),
  author: z.string().trim().min(2).max(100),
  genre: z.string().trim().min(2).max(50),
  rating: z.coerce.number().int().min(1).max(5),
  totalCopies: z.coerce.number().int().positive().lte(100000),
  coverUrl: z.string().nonempty(),
  coverColor: z
    .string()
    .trim()
    .regex(/^#[0-9A-F]{6}$/i),
  videoUrl: z.string().nonempty(),
  summary: z.string().trim().min(10).max(1000),
});
