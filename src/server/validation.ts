import { z } from "zod";

export const bookingRequestSchema = z.object({
  name: z.string().min(2, "Name is required").max(100),
  email: z.string().email("Valid email is required").max(200),
  preferredTimes: z.string().min(5, "Please share preferred times").max(1000),
  topic: z.string().min(10, "Please describe what you'd like to discuss").max(2000),
});

export type BookingRequest = z.infer<typeof bookingRequestSchema>;
