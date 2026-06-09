const { z } = require("zod");

const registerSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, "Full name must be at least 3 characters")
    .max(100, "Full name must not exceed 100 characters"),

  nim: z
    .string()
    .trim()
    .min(5, "NIM is invalid")
    .max(30, "NIM is invalid"),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Invalid email address"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
      "Password must contain uppercase, lowercase, and number"
    ),
});

const loginSchema = z.object({
  nim: z
    .string()
    .regex(/^\d+$/, "NIM must contain only numbers"),

  password: z
    .string()
    .min(1, "Password is required"),
});

const refreshTokenSchema = z.object({});

module.exports = {
  registerSchema,
  loginSchema,
  refreshTokenSchema,
};