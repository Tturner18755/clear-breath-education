import type { BookingRequest } from "./validation";
import { site } from "@/config/site";

export function visitorConfirmationHtml(data: BookingRequest): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Request received</title></head>
<body style="font-family: system-ui, sans-serif; line-height: 1.5; color: #1e293b; max-width: 560px; margin: 0 auto; padding: 24px;">
  <h1 style="font-size: 1.5rem; color: #1e3a5f;">We received your request</h1>
  <p>Hi ${escapeHtml(data.name)},</p>
  <p>Thank you for requesting an educational coaching session with ${site.name}.</p>
  <p><strong>What you shared:</strong></p>
  <ul>
    <li><strong>Preferred times:</strong> ${escapeHtml(data.preferredTimes)}</li>
    <li><strong>Topic:</strong> ${escapeHtml(data.topic)}</li>
  </ul>
  <p>We will review and reply shortly with next steps and available times.</p>
  <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
  <p style="font-size: 0.875rem; color: #64748b;"><em>${site.disclaimer}</em></p>
  <p style="font-size: 0.875rem; color: #64748b;">— ${site.therapist}<br>${site.name}</p>
</body>
</html>`;
}

export function ownerNotificationHtml(data: BookingRequest): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>New booking request</title></head>
<body style="font-family: system-ui, sans-serif; line-height: 1.5; color: #1e293b; max-width: 560px; margin: 0 auto; padding: 24px;">
  <h1 style="font-size: 1.5rem; color: #1e3a5f;">New education session request</h1>
  <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
  <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
  <p><strong>Preferred times:</strong><br>${escapeHtml(data.preferredTimes)}</p>
  <p><strong>Topic:</strong><br>${escapeHtml(data.topic)}</p>
  <p style="margin-top: 24px; font-size: 0.875rem; color: #64748b;">Reply-To is set to the visitor email.</p>
</body>
</html>`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
