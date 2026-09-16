export const site = {
  name: "Clear Breath Education",
  therapist: "Your educator",
  email: "clearbreatheducation@gmail.com",
  /** Vagaro business / booking page — schedule + payment + packs */
  vagaroUrl: "",
  doxyRoomUrl: "",
  offers: {
    intro: { label: "Intro session", minutes: 30, price: 70 },
    standard: { label: "Standard session", minutes: 60, price: 130 },
    pack: {
      label: "3-session pack",
      sessions: 3,
      minutesEach: 60,
      price: 330,
      perSession: 110,
    },
  },
  disclaimer:
    "This is educational coaching only. It is not medical advice, diagnosis, or treatment. It is not a substitute for care from your licensed healthcare provider.",
} as const;

export type SiteConfig = typeof site;
