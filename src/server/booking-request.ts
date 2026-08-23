import { bookingRequestSchema } from "./validation";
import { checkRateLimit } from "./rate-limit";
import { sendBookingEmails } from "./send-email";

export async function handleBookingRequest(raw: unknown) {
  const parsed = bookingRequestSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false as const,
      error: "Invalid form data",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const rate = checkRateLimit(parsed.data.email);
  if (!rate.ok) {
    return { success: false as const, error: rate.message };
  }

  try {
    await sendBookingEmails(parsed.data);
    return { success: true as const };
  } catch (err) {
    console.error("Booking email failed", err);
    return {
      success: false as const,
      error: "Unable to send confirmation. Please try again or email us directly.",
    };
  }
}
