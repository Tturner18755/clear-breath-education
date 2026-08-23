import { site } from "@/config/site";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24 lg:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        <div className="max-w-xl">
          <h1 className="font-heading text-4xl font-bold tracking-tight text-navy sm:text-5xl lg:text-[3.25rem] lg:leading-[1.15]">
            Learn to use your respiratory equipment with confidence
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Clear, practical educational coaching on CPAP, oxygen, and airway
            clearance equipment. One-on-one sessions that teach you how things
            work so you can feel prepared at home.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href="#booking">
              <Button size="lg">Book an Education Session</Button>
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              See how it works →
            </a>
          </div>
          <p className="mt-6 text-sm italic text-muted-foreground">
            Educational coaching only — not medical advice
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-2xl shadow-xl shadow-primary/10 ring-1 ring-border/50">
            <img
              src="/hero-therapist.jpg"
              alt="Respiratory therapist teaching a patient over a video call in warm natural light"
              className="aspect-[4/3] w-full object-cover"
              width={800}
              height={600}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
