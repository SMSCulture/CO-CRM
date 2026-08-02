import { z } from "zod";

const emailPattern = z
  .string()
  .trim()
  .toLowerCase()
  .email({ message: "Please enter a valid email" })
  .max(254, { message: "Email is too long" });

// OTP Request Schema — Step 1 (passwordless auth)
export const otpRequestSchema = z.object({
  email: emailPattern,
});
export type OtpRequestFormData = z.infer<typeof otpRequestSchema>;

// OTP Verification Schema — Step 2 (passwordless auth)
export const otpVerifySchema = z.object({
  email: z.string().email(),
  otp: z
    .string()
    .length(6, { message: "Code must be 6 digits" })
    .regex(/^\d{6}$/, { message: "Code must contain only digits" }),
});
export type OtpVerifyFormData = z.infer<typeof otpVerifySchema>;
