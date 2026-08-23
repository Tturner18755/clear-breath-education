import { site } from "@/config/site";
import {
  visitorConfirmationHtml,
  ownerNotificationHtml,
} from "./email-templates";
import type { BookingRequest } from "./validation";

async function sendMail(opts: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<void> {
  console.log("[email stub]", {
    to: opts.to,
    subject: opts.subject,
    replyTo: opts.replyTo,
  });
  return;
}

export async function sendBookingEmails(data: BookingRequest): Promise<void> {
  await Promise.all([
    sendMail({
      to: data.email,
      subject: `We received your request — ${site.name}`,
      html: visitorConfirmationHtml(data),
    }),
    sendMail({
      to: site.email,
      subject: `New education session request from ${data.name}`,
      html: ownerNotificationHtml(data),
      replyTo: data.email,
    }),
  ]);
}
