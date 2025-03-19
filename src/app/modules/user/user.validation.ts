import { z } from "zod";

export const userValidationSchema = z.object({
  id: z.string().min(1, "ID is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  needsPassword: z.boolean().optional().default(true),
  role: z.enum(["student", "faculty", "admin"]),
  status: z.enum(["in-progress", "blocked"]).default("in-progress"),
  isDeleted: z.boolean().default(false),
});

export const UserValidation = {
  userValidationSchema,
};
