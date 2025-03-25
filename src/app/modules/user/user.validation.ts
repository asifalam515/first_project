import { z } from "zod";

export const userValidationSchema = z.object({
  password: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(6, "Password must be at least 6 characters long")
    .optional(),
});

export const UserValidation = {
  userValidationSchema,
};
