export const site = {
  name: "Clear Breath Education",
  therapist: "Your educator",
  email: "clearbreatheducation@gmail.com",
  calendlyUrl: "",
  stripePaymentUrl: "",
  doxyRoomUrl: "",
  disclaimer:
    "This is educational coaching only. It is not medical advice, diagnosis, or treatment. It is not a substitute for care from your licensed healthcare provider.",
} as const;

export type SiteConfig = typeof site;
