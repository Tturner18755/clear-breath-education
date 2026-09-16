const steps = [
  {
    number: "1",
    title: "Book and pay in one place",
    description:
      "Choose a 30- or 60-minute education session or a session pack on Vagaro. You pick the time and pay there — no separate invoice.",
  },
  {
    number: "2",
    title: "Get your video link",
    description:
      "After booking you’ll receive the private Doxy room link by email. Same room for every session.",
  },
  {
    number: "3",
    title: "Join your education session",
    description:
      "Connect from any device at the scheduled time. Sessions are educational coaching only — not medical care.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-20 bg-soft-blue/50 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            How it works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Book and pay on Vagaro, then meet on a private video link.
          </p>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number} className="relative text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary font-heading text-xl font-bold text-primary-foreground shadow-md">
                {step.number}
              </div>
              <h3 className="mt-5 font-heading text-xl font-semibold text-navy">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
